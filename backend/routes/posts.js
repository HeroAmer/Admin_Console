const express = require("express");
const Post = require('../models/post');

const router = express.Router();


///endpoint for adding posts on server
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    image: req.body.image,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added succsesfully'
  });
});


/// fetching data from DB
router.get("", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});


module.exports = router;
