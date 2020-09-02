//QYoqNEnrTgfKCbHv
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Post = require('./models/post');


const app = express();
///adding body parser so that we can add posts on server
mongoose.connect("mongodb+srv://admin:QYoqNEnrTgfKCbHv@adminconsole.rg6fm.mongodb.net/admin-console?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  })
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

///adding headers that are required for communication between servers, and also provide us with methods such as GET, POST..etc
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});



///endpoint for adding posts on server
app.post("/api/posts", (req, res, next) => {
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



///endpoint for fetching posts on frontend
// app.use("/api/posts", (req, res, next) => {
//   const posts = [{
//       id: '34523452345fdgs',
//       title: 'My first title',
//       content: 'Someee coool dummy content',
//       image: '../assets/noPhoto.jpg'
//     },
//     {
//       id: '3452344fd45fdgs',
//       title: 'My second post',
//       content: 'Someee coool dummy second content',
//       image: '../assets/noPhoto.jpg'
//     }
//   ]
//   res.status(200).json({
//     message: 'Posts fetched succsesfully',
//     posts: posts
//   });
// });

/// fetching data from DB
app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

module.exports = app;
