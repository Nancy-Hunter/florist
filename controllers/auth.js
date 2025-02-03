const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const { promisify } = require("util");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/admin/profile");
  }
  res.render("login.ejs");
};

exports.getResetPassword = (req, res) => {
  if (req.user) {
    return res.redirect("/admin/profile");
  }
  res.render("resetPassword", {
    title: "Reset Password",
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email)) {
      validationErrors.push({ msg: "Please enter a valid email address." });
    }
    if (validator.isEmpty(req.body.password)) {
      validationErrors.push({ msg: "Password cannot be blank." });
    }
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/admin/login");
    }

    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    const authenticate = promisify(passport.authenticate("local"));
    const user = await authenticate(req, res, next);

    if (!user) {
      req.flash("errors", [{ msg: "Invalid email or password." }]);
      return res.redirect("/admin/login");
    }

    const logIn = promisify(req.logIn.bind(req));
    await logIn(user);

    req.flash("success", { msg: "Success! You are logged in." });
    res.redirect(req.session.returnTo || "/admin/profile");
  } catch (err) {
    return next('hhii');
  }
};

exports.logout = async (req, res, next) => {
  try {
    if (req.logout) {
      const logout = promisify(req.logout.bind(req));
      await logout();
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error: Failed to destroy the session during logout.", err);
      }
      req.user = null;
      res.redirect("/");
    });
  } catch (err) {
    return next(err);
  }
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/admin/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = async (req, res, next) => {
  try {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email)) {
      validationErrors.push({ msg: "Please enter a valid email address." });
    }
    if (!validator.isLength(req.body.password, { min: 8 })) {
      validationErrors.push({
        msg: "Password must be at least 8 characters long.",
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      validationErrors.push({ msg: "Passwords do not match." });
    }

    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/admin/signup");
    }

    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });

    if (existingUser) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      return res.redirect("/admin/signup");
    }

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    const logIn = promisify(req.logIn.bind(req));
    await logIn(user);

    res.redirect("/admin/profile");
  } catch (err) {
    return next(err);
  }
};