const User = require("../models/prismaClient").user;
const Post = require("../models/prismaClient").post;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const postRegister = async (req, res) => {
    try {
        const {username, password, confirmPassword} = req.body;

        const existingUser = await User.findUnique({
            where: {
                username
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        };

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        const payload = {
            sub: newUser.id,
            iat: Math.floor(Date.now() / 1000)
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findUnique({
            where: {
                username
            }
        })

        if (!user) {
            return res.status(401).json({ message: "Invalid username" });
        };

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const payload = {
            sub: user.id,
            iat: Math.floor(Date.now() / 1000)
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).json({
            success: true,
            user,
            token
        })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getUser = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const user = await User.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            user
        })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const putUpdateUserAuthorStatus = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { code } = req.body;

        const user = await User.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isAuthor) {
            return res.status(400).json({ message: "User already has author privileges" });
        }

        if (code !== process.env.AUTHOR_CODE) {
            return res.status(400).json({ message: "Incorrect code" });
        }

        const updatedUser = await User.update({
            where: {
                id
            },
            data: {
                isAuthor: true
            }
        });

        return res.status(200).json({
            message: "Granted user author privileges",
            user: updatedUser
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    postRegister,
    postLogin,
    getUser,
    putUpdateUserAuthorStatus
}