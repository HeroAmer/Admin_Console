const express = require("express");
const multer = require("multer");

///Model for posts
const Post = require('../models/post');

const router = express.Router();

//helper for detecting a type of a image that's recieved
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg'
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValidType = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValidType) {
      error = null;
    }
    //drugi parametar je relative path od server.js , ukoliko se server.js promijeni morat ce se promijeniti i ovaj path
    cb(error, 'backend/images');
  },
  file: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    //detecting an extension
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extension);
  }
});


///endpoint for adding posts on server
router.post("", multer({
  storage: storage
}).single("image"), (req, res, next) => {
  url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added succsesfully',
      post: {
        ...createdPost,
        id: createdPost._id
      }
    })
  })
});

router.delete("/:id", (req, res, next) => {
  console.log(req.body.params);
  Post.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Post deleted'
    })
  })
})
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
