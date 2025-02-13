const Post = require("../models/prismaClient").post;

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findMany();

        return res.status(200).json({
            posts
        })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getSinglePost = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const post = await Post.findUnique({
            where: {
                id
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ post })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const postCreatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.user;

        const newPost = await Post.create({
            data: {
                title,
                content,
                userId: id
            }
        });

        return res.status(201).json({
            message: "Post created",
            post: newPost
        })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const putUpdatePost = async (req, res) => {
    try {
        const { title, content, published } = req.body;
        const id = Number(req.params.id);

        const post = await Post.findUnique({
            where: {
                id
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        };

        if (post.userId !== req.user.id && !req.user.isAuthor) {
            return res.status(403).json({ message: "This post belongs to another user" });
        }

        const updatedPost = await Post.update({
            where: {
                id
            },
            data: {
                title,
                content,
                published
            }
        });

        return res.status(200).json({
            message: "Post updated",
            updatedPost
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deletePost = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const post = await Post.findUnique({
            where: {
                id
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        };

        if (post.userId !== req.user.id && !req.user.isAuthor) {
            return res.status(403).json({ message: "This post belongs to another user" });
        };        

        await Post.delete({
            where: {
                id
            }
        });

        return res.status(200).json({ message: "Post deleted" });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllPosts,
    getSinglePost,
    postCreatePost,
    putUpdatePost,
    deletePost
}