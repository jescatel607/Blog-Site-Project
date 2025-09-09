const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const adminLayout = "./layouts/admin"; // <- correct layout path (relative to views)

// Check Login Middleware (JWT in httpOnly cookie)
const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect("/admin"); // or res.status(401).json({message:"Unauthorized"})
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.redirect("/admin");
  }
};

/* -------------------- AUTH & SHELL PAGES -------------------- */

// Admin login page (GET)  -> /admin
router.get("/", async (req, res) => {
  const locals = {
    title: "Admin",
    description: "A blog template made with Node.js and ExpressJS",
  };
  res.render("admin/index", { locals, layout: adminLayout });
});

// Admin login (POST) -> /admin/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "7d",
    });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
});

// Admin logout -> /admin/logout
router.get("/logout", authMiddleware, (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin");
});

// Dashboard -> /admin/dashboard
router.get("/dashboard", authMiddleware, async (req, res, next) => {
  try {
    const locals = {
      title: "Dashboard",
      description: "A blog template made with Node.js and ExpressJS",
    };

    const data = await Post.find().sort({ createdAt: -1 }).lean();
    res.render("admin/dashboard", { locals, data, layout: adminLayout });
  } catch (err) {
    next(err);
  }
});

// New post form -> /admin/add-post (GET)
router.get("/add-post", authMiddleware, (req, res) => {
  const locals = {
    title: "Create Post",
    description: "A blog template made with Node.js and ExpressJS",
  };
  res.render("admin/add-post", { locals, layout: adminLayout });
});

// Create post -> /admin/add-post (POST)
router.post("/add-post", authMiddleware, async (req, res) => {
  try {
    await Post.create({
      title: req.body.title,
      body: req.body.body,
      // author: req.userId, // if you track ownership
    });
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Could not create post");
  }
});

// Edit form -> /admin/edit-post/:id (GET)
router.get("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    const locals = { title: "Edit Post", description: "Edit your post" };
    const data = await Post.findById(req.params.id).lean();
    if (!data) return res.status(404).send("Post not found");
    res.render("admin/edit-post", { locals, data, layout: adminLayout });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading edit form");
  }
});

// Update post -> /admin/edit-post/:id (POST)
router.post("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          body: req.body.body,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Could not update post");
  }
});

// Delete post -> /admin/delete-post/:id (GET or better: DELETE with method-override)
router.get("/delete-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Could not delete post");
  }
});

module.exports = router;
