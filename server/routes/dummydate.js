const post = require("../model/post");

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
