import AdminJS from "adminjs";
import express from "express";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
// import uploadFeature from "@adminjs/upload"; // We'll handle upload manually or with a better hook
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Artiste } from "./models/Artiste.js";
import { Album } from "./models/Album.js";
import { Song } from "./models/Song.js";
import { User } from "./models/User.js";
import { Comment } from "./models/Comment.js";
import { Playlist } from "./models/Playlist.js";
import { componentLoader } from "./component.js";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fix: Load .env from root directory using absolute path
dotenv.config({ path: resolve(__dirname, "../.env") });

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const navigation = (name, icon) => {
  return { name, icon };
};

const adminOptions = {
  resources: [
    User,
    Comment,
    Playlist,
    {
      resource: Artiste,
      options: {
        navigation: navigation("Artiste", "User"),
      },
    },
    {
      resource: Album,
      options: {
        navigation: navigation("Album", "Folder"),
      },
    },
    {
      resource: Song,
      options: {
        navigation: navigation("Song", "Music"),
        properties: {
          audioURL: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
          audioFile: {
            isVisible: { edit: true, show: false, list: false, filter: false },
            type: "file",
            label: "Audio File (Cloudinary)",
          },
          coverImageFile: {
            isVisible: { edit: true, show: false, list: false, filter: false },
            type: "file",
            label: "Cover Image (Cloudinary)",
          },
          lyrics: {
            type: "richtext",
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.method === "post") {
                const { audioFile, coverImageFile } = request.payload;

                // Handle Audio Upload
                if (audioFile && audioFile.path) {
                  console.log("Uploading audio to Cloudinary...");
                  try {
                    const audioResult = await cloudinary.uploader.upload(audioFile.path, {
                      resource_type: "video",
                      folder: "neon-music/audio",
                    });
                    request.payload.audioURL = audioResult.secure_url;
                  } catch (err) {
                    console.error("Cloudinary Audio Upload Error:", err);
                  }
                }

                // Handle Cover Image Upload
                if (coverImageFile && coverImageFile.path) {
                  console.log("Uploading cover image to Cloudinary...");
                  try {
                    const imageResult = await cloudinary.uploader.upload(coverImageFile.path, {
                      resource_type: "image",
                      folder: "neon-music/covers",
                    });
                    request.payload.coverImage = imageResult.secure_url;
                  } catch (err) {
                    console.error("Cloudinary Image Upload Error:", err);
                  }
                }
              }
              return request;
            },
          },
          edit: {
            before: async (request) => {
              if (request.method === "post") {
                const { audioFile, coverImageFile } = request.payload;

                if (audioFile && audioFile.path) {
                  const audioResult = await cloudinary.uploader.upload(audioFile.path, {
                    resource_type: "video",
                    folder: "neon-music/audio",
                  });
                  request.payload.audioURL = audioResult.secure_url;
                }

                if (coverImageFile && coverImageFile.path) {
                  const imageResult = await cloudinary.uploader.upload(coverImageFile.path, {
                    resource_type: "image",
                    folder: "neon-music/covers",
                  });
                  request.payload.coverImage = imageResult.secure_url;
                }
              }
              return request;
            },
          },
        },
      },
    },
  ],
};

const start = async () => {
  const app = express();
  
  if (!process.env.DB_STRING) {
    console.error("❌ DB_STRING is missing in .env! Check path mapping.");
  }

  const mongooseDB = await mongoose.connect(process.env.DB_STRING);
  console.log(`MongoDB connected: ${mongooseDB.connection.host}`);

  const admin = new AdminJS({
    ...adminOptions,
    componentLoader,
    databases: [mongooseDB],
    rootPath: "/admin",
  });
  
  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  admin.watch();

  const PORT = process.env.PORT || 4001; // Default to 4001 if main app is on 4000
  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();

