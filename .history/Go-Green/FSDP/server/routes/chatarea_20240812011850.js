const express = require("express");
const router = express.Router();
const { User, ChatArea, Comment } = require("../models");
const { Op } = require("sequelize");
const yup = require("yup");
const { validateToken } = require("../middlewares/auth");
const { upload } = require("../middlewares/upload");

// Create a new chat post
router.post("/", validateToken, (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    let data = req.body;
    data.userId = req.user.id;

    if (req.file) {
      data.imageFile = req.file.filename; // Save the filename in the database
    }

    // Validation schema
    const validationSchema = yup.object({
      title: yup.string().trim().min(3).max(30).required(),
      content: yup.string().trim().min(3).max(5000).required(),
      link: yup.string().trim().url().nullable(true),
    });

    try {
      data = await validationSchema.validate(data, { abortEarly: false });
      const newPost = await ChatArea.create(data);
      res.json(newPost);
    } catch (validationError) {
      res.status(400).json({ errors: validationError.errors });
    }
  });
});

// Show all chat posts
router.get("/", async (req, res) => {
  let condition = {};
  let search = req.query.search;
  if (search) {
    condition[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { content: { [Op.like]: `%${search}%` } },
    ];
  }

  let list = await ChatArea.findAll({
    where: condition,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
      {
        model: Comment,
        as: "comments",
        include: {
          model: User,
          as: "user", // Include the user associated with each comment
          attributes: ["name"],
        },
      },
    ],
  });
  res.json(list);
});
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let chatPost = await ChatArea.findByPk(id, {
      include: [
        { model: User, as: "user", attributes: ["name"] },
        { model: Comment, as: "comments", required: false }, // Include comments
      ],
    });
    if (!chatPost) {
      return res.sendStatus(404);
    }

    // Ensure comments is always an array
    if (!chatPost.comments) {
      chatPost.comments = [];
    }

    res.json(chatPost);
  } catch (error) {
    console.error("Error fetching chat post:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update chat post via ID
router.put("/:id", validateToken, (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    let id = req.params.id;
    let chatPost = await ChatArea.findByPk(id);
    if (!chatPost) {
      res.sendStatus(404);
      return;
    }

    // Check if user is the owner or has ADMIN role
    if (req.user.id === chatPost.userId || req.user.roles.includes("ADMIN")) {
      let data = req.body;

      if (req.file) {
        data.imageFile = req.file.filename;
      }

      // Validation schema
      const validationSchema = yup.object({
        title: yup.string().trim().min(3).max(30),
        content: yup.string().trim().min(3).max(5000),
        link: yup.string().trim().url().nullable(true),
      });

      try {
        data = await validationSchema.validate(data, { abortEarly: false });
        let num = await ChatArea.update(data, {
          where: { id: id },
        });

        if (num == 1) {
          res.json({
            message: "Chat post was updated successfully.",
          });
        } else {
          res.status(400).json({
            message: `Cannot update chat post with id ${id}.`,
          });
        }
      } catch (validationError) {
        res.status(400).json({ errors: validationError.errors });
      }
    } else {
      res
        .status(403)
        .json({ message: "You do not have the required permissions" });
    }
  });
});

router.delete("/:id", validateToken, async (req, res) => {
  try {
    const post = await ChatArea.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/like/:postId", validateToken, async (req, res) => {
  try {
    const post = await ChatArea.findByPk(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = req.user.id;

    if (post.likedBy.includes(userId)) {
      // User already liked the post, so remove the like
      post.likedBy = post.likedBy.filter((id) => id !== userId);
      post.likes -= 1;
    } else {
      // If the user had disliked the post, remove the dislike
      if (post.dislikedBy.includes(userId)) {
        post.dislikedBy = post.dislikedBy.filter((id) => id !== userId);
        post.dislikes -= 1;
      }
      // Add the like
      post.likedBy.push(userId);
      post.likes += 1;
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/dislike/:postId", validateToken, async (req, res) => {
  try {
    const post = await ChatArea.findByPk(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = req.user.id;

    if (post.dislikedBy.includes(userId)) {
      // User already disliked the post, so remove the dislike
      post.dislikedBy = post.dislikedBy.filter((id) => id !== userId);
      post.dislikes -= 1;
    } else {
      // If the user had liked the post, remove the like
      if (post.likedBy.includes(userId)) {
        post.likedBy = post.likedBy.filter((id) => id !== userId);
        post.likes -= 1;
      }
      // Add the dislike
      post.dislikedBy.push(userId);
      post.dislikes += 1;
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/comment/:postId", validateToken, async (req, res) => {
  try {
    const post = await ChatArea.findByPk(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const { content } = req.body;

    if (content) {
      const comment = await Comment.create({
        postId: req.params.postId,
        userId: req.user.id,
        content,
      });

      // Fetch the full comment with user data
      const fullComment = await Comment.findByPk(comment.id, {
        include: {
          model: User,
          as: "user",
          attributes: ["name"],
        },
      });

      console.log("New Comment:", fullComment);

      post.comments = post.comments || [];
      post.comments.push(fullComment);

      console.log("Updated Post:", post);

      res.json(post);
    } else {
      res.status(400).json({ error: "Comment content is required" });
    }
  } catch (error) {
    console.error("Error adding the comment:", error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/report", validateToken, async (req, res) => {
  try {
    const { postId, type, description } = req.body;
    await Report.create({
      postId,
      userId: req.user.id,
      type,
      description,
    });
    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to submit report" });
  }
});

module.exports = router;
