const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Category = require('../models/category');
const middleware = require("../middleware");
const Comment = require("../models/comment");
const mongoose = require("mongoose");


router.get('/', async(req, res) => {

    Post.find()
        .populate('category')
        .exec(async(err, posts) => {
            if (err) {
                console.log(err)
            } else {

                console.log('these are post :::::' + posts)
                const categories = await Category.find();
                res.render('default/posts', { posts: posts, categories: categories });
            }
        })

})

// Single Post
router.get('/:id', async(req, res) => {

    const categories = await Category.find();
    /*
        Post.findById(req.params.id)
            .populate('comments')
            .populate('affiliates')
            .exec((err, post) => {
                if (err && !post) {
                    console.log(err)
                } else {
                    console.log(post)
                    res.render('default/kmcSinglePost', { post: post, categories: categories });
                }
            })
            */
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return false;

    const post = await Post.findById(req.params.id).populate({
        path: 'comments',
    });
    if (!post) {
        req.flash('error', 'Cannot find that posts!');
        return res.redirect('/posts');
    }
    res.render('default/kmcSinglePost', { post, categories });

});

//ADD NEW COMMENT TO POST
router.post('/:id', middleware.isLoggedIn, (req, res) => {
    //find post to add a comment on by id
    const post_id = req.params.post_id;

    Post.findById(id, (err, post) => {
        if (err) {
            console.log('post exists')
        } else {
            const { commentBody } = req.body.comment_body;
            Comment.create(commentBody, (err, newComment) => {
                if (err) {
                    console.log(err)
                } else {
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    post.comments.push(newComment);
                    post.save()
                    res.redirect('/posts/' + post_id)
                    console.log(newComment)
                }
            })
        }
    })
})

module.exports = router;