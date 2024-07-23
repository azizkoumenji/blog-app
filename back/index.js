import express from "express";
import postsRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import multer from "multer"; // Used to save images in our server.
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cookieParser());

// Handle image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.listen(8800, () => {
  console.log("Connected!");
});

app.use("/api/posts", postsRoutes);
app.use("/api/auth", authRoutes);
app.post("/api/uploads", upload.single("img"), (req, res) => {
  res.status(200).json(req.file.filename);
});
app.get("/api/uploads/:img", async (req, res) => {
  const imgName = req.params.img;
  const imgPath = path.join(__dirname, "uploads", imgName);
  res.sendFile(imgPath, (err) => {
    if (err) res.status(404).send("Image not found.");
  });
});
