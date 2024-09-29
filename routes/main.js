const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const purchaseStatusController = require("../controllers/purchase.js")

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/flowersFor/:theme", postsController.getCategory);
router.get("/feed", postsController.getFeed);
router.get("/success",purchaseStatusController.getTransactionSuccessful);
router.get("/cancelled",purchaseStatusController.getTransactionCancelled);


module.exports = router;
