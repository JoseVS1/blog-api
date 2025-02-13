const Comment = require("../models/prismaClient").comment;
const Post = require("../models/prismaClient").post;

const getPostComments = async (req, res) => {
    try {
        const postId = Number(req.params.id);

        const post = await Post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post doesn't exist" });
        };

        const comments = await Comment.findMany({
            where: {
                postId
            }
        });

        return res.status(200).json({ comments });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const postCreatePostComment = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = Number(req.params.id);

        const post = await Post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post doesn't exist" });
        };
        
        const comment = await Comment.create({
            data: {
                text,
                userId: Number(req.user.id),
                postId
            }
        });

        return res.status(201).json({
            message: "Comment created",
            comment
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getPostComments,
    postCreatePostComment
}