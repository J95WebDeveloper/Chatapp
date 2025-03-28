import User from "../schemas/authSchema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const Register = async (req, res) => {
  const { fullname, email, password, profilePic, profileBio } = req.body;
  try {
    //hash password
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists, you can login now",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
      profilePic,
      profileBio,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        message: "User Registered Successfully",
        success: true,
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
        profileBio: newUser.profileBio,
      });
    } else {
      return res.status(404).json({ message: "Invalid User data" });
    }
  } catch (err) {
    return res.status(501).json({
      message: "Internal server error".err,
      success: false,
    });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or Password not found..." });
    }

    const isPassword = new bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ message: "password did not match" });
    }

    generateToken(user._id, res);

    res.status(201).json({
      message: "User LoggedIn Successfully",
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
      profileBio: user.profileBio,
    });
  } catch (error) {
    res.status(501).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({
      message: "User Logged out Successfully",
    });
  } catch (error) {
    res.status(501).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

export default { Register, Login, Logout };
