const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/onSale/:id", postsController.onSale);

router.put("/soldOut/:id", postsController.soldOut);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
