import express from "express";

import Post from "../../models/post";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", async (req, res) => {
  const postFindResult = await Post.find();
  console.log(postFindResult, "All Post get");
  res.json(postFindResult);
});

router.post("/", auth, async (req, res, next) => {
  try {
    console.log(req, "req");
    const { title, content, fileUrl, creator } = req.body;
    const newPost = await Post.create({
      title,
      content,
      fileUrl,
      creator,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

export default router;
