const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    comments: [
        {
            text: String,
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            username: String, // <-- Add this line
            createdAt: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model("Post", PostSchema);
