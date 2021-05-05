const express = require("express");

const extractFile = require("../middleware/file");
const checkAuth = require("../middleware/check-auth");

const PostController = require("../controllers/post");

const router = express.Router();



router.post("",
  checkAuth,
  extractFile, PostController.createPost);

router.put("/:id",
  checkAuth,
  extractFile, PostController.updatePostById);

//get all posts
router.get("", PostController.getAllPosts);

//get post by id
router.get("/:id", PostController.getPostById);

router.delete("/:id", checkAuth, PostController.deletePostById);

module.exports = router;
