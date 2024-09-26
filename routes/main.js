const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/flowersFor/:theme", postsController.getCategory);
router.get("/feed", postsController.getFeed);
router.get("/cart", postsController.getCart);

module.exports = router;
