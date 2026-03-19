const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// .env ෆයිල් එකේ තියෙන විස්තර (Database URL එක) ගන්න
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Mongoose හරහා MongoDB එකට Connect වීම
mongoose.connect(process.env.DB_STRING || process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// අපි Database එට දාන්න යන සිංදු ලිස්ට් එක
const artists = [
  "The Weeknd",
  "Taylor Swift",
  "Drake",
  "Bad Bunny",
  "Ed Sheeran",
  "Justin Bieber",
  "Dua Lipa",
  "Ariana Grande",
  "Post Malone",
  "Billie Eilish",
  "Bruno Mars",
  "Eminem",
  "Rihanna",
  "Harry Styles",
  "Selena Gomez",
];

// Trending සිංදු නම් 15ක්
const baseSongNames = [
  "Blinding Lights",
  "Cruel Summer",
  "God's Plan",
  "Tití Me Preguntó",
  "Shape of You",
  "Peaches",
  "Levitating",
  "7 rings",
  "Circles",
  "Bad Guy",
  "Uptown Funk",
  "Without Me",
  "Umbrella",
  "As It Was",
  "Calm Down",
];

// ලස්සන Cover Images ටිකක් (Unsplash වලින්)
const images = [
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500",
  "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f462?w=500",
  "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500",
];

// Play කරන්න පුළුවන් MP3 ලින්ක් එකක්
const audioUrl =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const generate100Songs = () => {
  const songs = []; // Loop එකක් හරහා සිංදු 100ක් ඔටෝ හදනවා

  for (let i = 1; i <= 100; i++) {
    // Arrays වලින් random විදිහට දේවල් තෝරගන්නවා
    const artistName = artists[i % artists.length];
    const songName = `${baseSongNames[i % baseSongNames.length]} (Vol. ${i})`;
    const cover = images[i % images.length]; // දවස් වෙනස් වෙන්න Date එකක් හදනවා

    const releaseDate = new Date();
    releaseDate.setDate(releaseDate.getDate() - i * 3); // දවස් 3න් 3ට පස්සට යනවා

    songs.push({
      title: songName,
      artiste: {
        name: artistName,
        image: cover,
      },
      coverImage: cover,
      audioURL: audioUrl,
      releaseDate: releaseDate,
      lyrics: `[Verse 1]\nThis is auto-generated trending song number ${i}.\nMusic is life, enjoy the vibe!\n\n[Chorus]\nOh yeah, we are streaming on Jollify!\nLet the beat drop!`,
      comments: [],
    });
  }
  return songs;
};

const importData = async () => {
  try {
    console.log("Connecting to Database...");
    const db = mongoose.connection; // කලින් දාපු පරණ සිංදු තියෙනවා නම් ඒ ටික ඔක්කොම මකනවා (එතකොට Duplicate වෙන්නේ නෑ)

    console.log("Clearing old songs, albums, artistes, and playlists...");
    await db.collection("songs").deleteMany({});
    await db.collection("albums").deleteMany({});
    await db.collection("artistes").deleteMany({});
    await db.collection("playlists").deleteMany({}); // අලුතින් හදපු සිංදු 100 ඇතුළත් කරනවා

    console.log("Inserting 100 trending songs...");
    const hundredSongs = generate100Songs();
    const songsResult = await db.collection("songs").insertMany(hundredSongs);
    const songIds = Object.values(songsResult.insertedIds); // Create artistes from the artists array

    console.log("Creating artistes...");
    const artisteDocs = artists.map((name, index) => ({
      name: name,
      image: images[index % images.length],
      bio: `This is the bio for ${name}, one of the most popular artists in the world.`,
      likes: [],
    }));
    const artistesResult = await db
      .collection("artistes")
      .insertMany(artisteDocs);
    const artisteIds = Object.values(artistesResult.insertedIds); // Create albums linked to artistes

    console.log("Creating albums...");
    const albumDocs = [];
    for (let i = 0; i < 15; i++) {
      albumDocs.push({
        title: `${artists[i % artists.length]} - Album ${Math.floor(i / 15) + 1}`,
        artiste: artisteIds[i % artisteIds.length],
        coverImage: images[i % images.length],
        releaseDate: new Date(),
        genre: ["Pop", "R&B", "Hip Hop", "Rock", "Electronic"][i % 5],
        songs: songIds.slice(i * 6, i * 6 + 6),
        likes: [],
      });
    }
    await db.collection("albums").insertMany(albumDocs); // Create playlists

    console.log("Creating playlists...");
    const playlistDocs = [
      {
        title: "Top Hits 2024",
        description: "The hottest tracks of the year",
        coverImage: images[0],
        createdBy: null,
        songs: songIds.slice(0, 10),
        likes: [],
      },
      {
        title: "Chill Vibes",
        description: "Relax and unwind with these smooth tracks",
        coverImage: images[1],
        createdBy: null,
        songs: songIds.slice(10, 20),
        likes: [],
      },
      {
        title: "Workout Motivation",
        description: "Pump up your workout session",
        coverImage: images[2],
        createdBy: null,
        songs: songIds.slice(20, 30),
        likes: [],
      },
      {
        title: "Party Anthems",
        description: "Get the party started!",
        coverImage: images[3],
        createdBy: null,
        songs: songIds.slice(30, 40),
        likes: [],
      },
      {
        title: "Late Night Feels",
        description: "Perfect for those late night drives",
        coverImage: images[4],
        createdBy: null,
        songs: songIds.slice(40, 50),
        likes: [],
      },
    ];
    await db.collection("playlists").insertMany(playlistDocs);

    console.log("✅ Data Imported Successfully! 🚀");
    console.log("   - 100 Songs");
    console.log("   - 15 Artistes");
    console.log("   - 15 Albums");
    console.log("   - 5 Playlists");
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};
importData();
