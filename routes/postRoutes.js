const express = require('express');
const router = express.Router();
const posts = require('../model/post');
const jwt = require('jsonwebtoken')
router.use(express.json())

function verifyToken(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            throw 'Unauthorized Access';
        }
        let payload = jwt.verify(token, 'reactblogapp');
        if (!payload) {
            throw 'Unauthorized Access';
        }
        next();
    } catch (error) {
        res.status(401).send(error); 
    }
}

//POST request
router.post('/add',verifyToken ,async(req, res)=>{
    try {
        const post = req.body;
        const data = await posts(post).save();
        res.status(200).send({message:"Blog Added"})
    } catch (error) {
        console.log(error)
    }
})

//GET request
router.get('/blogs',verifyToken, async (req, res) => {
    try {
        const allPosts = await posts.find(); 
        res.status(200).send(allPosts);
        console.log("All posts:", allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "An error occurred while fetching posts" });
    }
});

//GET using a specific ID 
router.get('/posts/:id',verifyToken, async (req, res) => { 
    try {
      const post = await posts.findById(req.params.id);
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //UPDATE Route
  router.put('/posts/:id', verifyToken, async (req, res) => {
    try {
      const updatedPost = await posts.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post updated successfully', data: updatedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //DELETE Route
  router.delete('/posts/:id', verifyToken, async(req, res) => {
    try {
        const deletedPost = await posts.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully', data: deletedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
  
module.exports = router