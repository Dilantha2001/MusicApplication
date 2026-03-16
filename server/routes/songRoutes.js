const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAllSongs,
  getSongDetails,
  likeSong,
  addComment,
  getAnySong,
  getTopSongs,
  uploadSong,
} = require("../controllers/songController");
const { verifyToken } = require("../middleware/authMiddleware");

// Use memory storage so file buffers can be streamed directly to Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllSongs);
router.get("/any", getAnySong);
router.get("/top", getTopSongs);
router.post(
  "/upload",
  verifyToken,
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  uploadSong
);
router.post("/:songId/like", verifyToken, likeSong);
router.post("/:songId/comment", verifyToken, addComment);
router.get("/:songId", getSongDetails);

module.exports = router;
