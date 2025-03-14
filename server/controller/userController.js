const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("Please fill in all fields");
    }
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(404).json("User already exits");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Please fill in all fields");
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(404).json("Invalid login credentials");

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.secret,
      { expiresIn: "3h" }
    );

    const { password: pass, ...rest } = user._doc;
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Success" });
  } catch (error) {
    res.status(400).json({ message: "Error Logging out" });
  }
};

module.exports = { signup, login, logout };
