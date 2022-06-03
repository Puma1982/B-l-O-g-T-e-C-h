const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE My POST

router.post("/", async (req, res) => {                     //  post method because we creating a new one
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE MY POST
router.put("/:id", async (req, res) => {                       //put method
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Sorry! Update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Post

router.delete("/:id", async (req, res) => {                     //DELETE METHOD
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Operation succeeded! post has been deleted!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Post
router.get("/:id", async (req, res) => {                              //GET METHOD
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Post
router.get("/", async (req, res) => {                  //fetching user with "/"
  const username = req.query.user;                  //fetching user with query
  const catName = req.query.cat;                            //fetching categories with query
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {                     //CATEGORY NAME
      posts = await Post.find({                   
        categories: {
          $in: [catName],                       //IN METHOD TO SAY THIS ARRAY INCLUDES THIS CATEGORY NAME          
        },
      });
    } else {                                    
      posts = await Post.find();                     //IF NO USERNAME NO CATEGORY NAME IT S GONNA FETCH ALL POSTS
    }
    res.status(200).json(posts);                       //RETURN THIS RESPONSE
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
