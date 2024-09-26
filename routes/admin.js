const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require("../controllers/auth");
const adminController = require("../controllers/admin");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Admin Routes 
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get("/profile", ensureAuth, adminController.getProfile);
router.post("/createPost", upload.single("file"), adminController.createPost);
router.put("/onSale/:id", adminController.onSale);
router.put("/soldOut/:id", adminController.soldOut);
router.delete("/deletePost/:id", adminController.deletePost);

module.exports = router;



