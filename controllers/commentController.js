const Comment = require("../models/prismaClient").comment;

const putUpdateComment = async (req, res) => {
    try {
        const { text, isAuthor } = req.body;
        const id = Number(req.params.id);

        const comment = await Comment.findUnique({
            where: {
                id
            }
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId !== req.user.id && !isAuthor) {
            return res.status(403).json({ message: "This comment belongs to another user" });
        }

        const updatedComment = await Comment.update({
            where: {
                id
            },
            data: {
                text
            }
        });

        return res.status(200).json({
            message: "Comment updated",
            comment: updatedComment
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteComment = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const comment = await Comment.findUnique({
            where: {
                id
            }
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId !== req.user.id && !req.user.isAuthor) {
            return res.status(403).json({ message: "This comment belongs to another user" });
        };

        await Comment.delete({
            where: {
                id
            }
        });

        return res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    putUpdateComment,
    deleteComment
}