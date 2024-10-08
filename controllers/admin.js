const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  // get request for admin profile page
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find().sort({ category: "asc" });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  //creates document in MongoDB for product
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        price: req.body.price,
        bloom: req.body.bloom,
        available: true,
        onSale: req.body.onSale == "true" ? true : false,
        discount: req.body.discount,
        category: req.body.category,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/admin/profile");
    } catch (err) {
      console.log(err);
    }
  },
  //Updates product's discount/onsale boolean status
  onSale: async (req, res) => {
    try {
      let onSaleFlag = req.body.discountUpdate>0
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        [{ $set: { 
            discount: { $toDecimal: Number.parseFloat(req.body.discountUpdate).toFixed(2)},
            onSale: onSaleFlag
            } 
        }]
      )
      console.log("item sale status changed!");
      res.redirect(`/admin/profile#${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  //updates available boolean status
  soldOut: async (req, res) => {
    try {
      await Post.findOneAndUpdate({ _id: req.params.id }, [
        { $set: { available: { $not: "$available" } } }, //switches boolean
      ]);
      console.log("item is available/soldout!");
      res.redirect(`/admin/profile#${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/admin/profile");
    } catch (err) {
      res.redirect("/admin/profile");
    }
  },
};
