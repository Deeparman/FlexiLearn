const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; 

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, uid } = req.body;
    console.log("password received:", password);

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "User with this email already exists" });

    const existingUid = await User.findOne({ uid });
    if (existingUid)
      return res.status(400).json({ message: "User with this UID (roll number) already exists" });

    const user = new User({ name, email, password, role, uid });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { name, uid, password } = req.body;

    const user = await User.findOne({ name, uid });
    if (!name || !uid || !password) {
      return res.status(400).json({ message: "Please provide name, UID, and password" });
    }
    console.log("User found:", user);

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        uid: user.uid,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
