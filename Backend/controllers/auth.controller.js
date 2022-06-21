import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = new User({ email, password });
    await user.save();

    return res.json({ ok: "Register" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "User already exist" });
    }
    return res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(403).json({ error: "User doesn't exist" });

    const respPassword = user.comparePassword(password);
    if (!respPassword)
      return res.status(403).json({ error: "Incorrect password" });

    //JWT
    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET);

    return res.json({ ok: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
