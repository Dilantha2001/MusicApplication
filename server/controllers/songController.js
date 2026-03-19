const Song = require("../models/Song");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../util/index");
const cloudinary = require("../config/cloudinary");

// @desc  Get all songs
// @route GET api/songs
// @access Public
const getAllSongs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const [songs, total] = await Promise.all([
    Song.find({})
      .skip(startIndex)
      .limit(limit)
      .populate("artiste", "name")
      .lean(),
    Song.countDocuments(),
  ]);
  if (!songs.length) {
    return res.status(404).json({ message: "No songs found" });
  }
  const shuffledSongs = shuffleArray(songs);
  res.status(200).json({ songs: shuffledSongs, total });
});

// @desc  Get specific song
// @route GET api/songs/:songId
// @access Public
const getSongDetails = asyncHandler(async (req, res) => {
  const songId = req.params.songId;
  const song = await Song.findById(songId)
    .populate("artiste", "name")
    .populate("album", "title")
    .populate({
      path: "comments.user",
      select: "username image",
    })
    .lean()
    .exec();
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  song.comments.sort((a, b) => b.createdAt - a.createdAt);
  res.status(200).json(song);
});

// @desc  Get top songs
// @route GET api/songs/top
// @access Public
const getTopSongs = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default to 10 if no limit provided

  const songs = await Song.aggregate([
    {
      $lookup: {
        from: "artistes",
        localField: "artiste",
        foreignField: "_id",
        as: "artiste",
      },
    },
    // Unwind artiste (Required - every song must have an artist)
    { $unwind: "$artiste" },
    {
      $lookup: {
        from: "albums",
        localField: "album",
        foreignField: "_id",
        as: "album",
      },
    },
    // CRITICAL FIX: preserveNullAndEmptyArrays allows songs without albums to show up
    { $unwind: { path: "$album", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 1,
        title: 1,
        coverImage: 1,
        duration: 1,
        audioURL: 1,
        artiste: { _id: "$artiste._id", name: "$artiste.name" },
        // If there is no album, it returns "Single" instead of breaking
        album: {
          _id: { $ifNull: ["$album._id", null] },
          title: { $ifNull: ["$album.title", "Single"] },
        },
      },
    },
    // For "Top Songs", you usually want to sort by plays or trendingScore
    // instead of a random $sample. But for now, here is your sample:
    { $sample: { size: limit } },
  ]);

  if (!songs || songs.length === 0) {
    return res.status(404).json({ message: "No songs found" });
  }

  res.status(200).json(songs);
});
// @desc  Get any song
// @route GET api/songs/any
// @access Public
const getAnySong = asyncHandler(async (req, res) => {
  const randomSong = await Song.aggregate([
    {
      $lookup: {
        from: "artistes",
        localField: "artiste",
        foreignField: "_id",
        as: "artiste",
      },
    },
    { $unwind: "$artiste" },
    {
      $lookup: {
        from: "albums",
        localField: "album",
        foreignField: "_id",
        as: "album",
      },
    },
    // preserveNullAndEmptyArrays prevents the song from being deleted if album is null
    { $unwind: { path: "$album", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 1,
        title: 1,
        coverImage: 1,
        audioURL: 1,
        artiste: {
          _id: "$artiste._id",
          name: "$artiste.name",
          image: "$artiste.image",
        },
        // Return null if album doesn't exist instead of breaking
        album: { $ifNull: ["$album.title", "Single"] },
      },
    },
    { $sample: { size: 1 } },
  ]);

  if (!randomSong || randomSong.length === 0) {
    return res.status(404).json({ message: "No featured song available" });
  }
  res.status(200).json(randomSong[0]);
});
// @desc  Upload a new song (audio + cover image) via Cloudinary
// @route POST api/songs/upload
// @access Private
const uploadSong = asyncHandler(async (req, res) => {
  const { title, artiste, album, genre, duration, releaseDate, lyrics } =
    req.body;

  if (!title || !artiste) {
    return res.status(400).json({ message: "Title and artiste are required" });
  }
  if (!req.files?.audio) {
    return res.status(400).json({ message: "Audio file is required" });
  }

  // Helper: stream a buffer to Cloudinary
  const uploadToCloudinary = (buffer, options) =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(buffer);
    });

  // Upload audio (Cloudinary uses resource_type "video" for audio files)
  const audioResult = await uploadToCloudinary(req.files.audio[0].buffer, {
    resource_type: "video",
    folder: "jollify/audio",
  });

  // Upload cover image if provided
  let coverImageUrl = "";
  if (req.files?.coverImage) {
    const coverResult = await uploadToCloudinary(
      req.files.coverImage[0].buffer,
      { resource_type: "image", folder: "jollify/covers" },
    );
    coverImageUrl = coverResult.secure_url;
  }

  const newSong = await Song.create({
    title,
    artiste,
    album: album || null,
    genre,
    duration,
    releaseDate,
    lyrics,
    audioURL: audioResult.secure_url,
    coverImage: coverImageUrl,
  });

  res.status(201).json(newSong);
});

// @desc  Like a song
// @route POST api/songs/:songId/like
// @access Private
const likeSong = asyncHandler(async (req, res) => {
  const songId = req.params.songId;
  const userId = req.user.id;
  const song = await Song.findById(songId);
  const user = await User.findById(userId);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  const toogled = await song.toogleLike(userId);
  if (toogled) {
    user.favoriteSongs.push(songId);
  } else {
    user.favoriteSongs.pull(songId);
  }
  await user.save();
  res.status(200).json({ message: "Like status toogled" });
});

// @desc  Add comment to song
// @route POST api/songs/:songId/comment
// @access Private
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const songId = req.params.songId;
  const userId = req.user.id;
  const song = await Song.findById(songId);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  song.comments.push({ text, user: userId });
  await song.save();
  res.status(201).json({ message: "Comment added" });
});

module.exports = {
  getAllSongs,
  getSongDetails,
  getAnySong,
  getTopSongs,
  uploadSong,
  likeSong,
  addComment,
};
