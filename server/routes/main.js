const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Home route
router.get("/", async (req, res, next) => {
  const locals = {
    title: "NodeJS Blog",
    description: "A simple blog on NodeJS",
  };

  const perPage = 3;
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);

  const data = await Post.find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .lean();

  const count = await Post.countDocuments();
  const totalPages = Math.max(Math.ceil(count / perPage), 1);

  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  res.render("index", {
    locals,
    data,
    page,
    totalPages,
    nextPage,
    prevPage,
  });
});

// Get Post by Id
router.get("/post/:id", async (req, res, next) => {
  try {
    const data = await Post.findById(req.params.id).lean();
    if (!data) return res.status(404).send("Post not found");

    const locals = {
      title: data.title,
      description: "A simple blog on NodeJS",
    };
    res.render("post", { locals, data });
  } catch (err) {
    next(err);
  }
});

//  Search Route
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "A blog template made with NodeJS and ExpressJS",
    };

    const searchTerm = (req.body.searchTerm || "").trim();
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    }).lean();

    res.render("search", { locals, data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
