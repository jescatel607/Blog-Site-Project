const mongoose = require("mongoose");
const Post = require("../models/Post");

const dbPath = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbPath);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const post = require("../models/Post");

function insertPostData() {
  post.insertMany([
    {
      title: "First Post",
      body: "This is the body of the first post.",
    },
    {
      title: "Second Post",
      body: "This is the body of the second post.",
    },
    {
      title: "Third Post",
      body: "This is the body of the third post.",
    },
  ]);
}

insertPostData();

module.exports = connectDB;
