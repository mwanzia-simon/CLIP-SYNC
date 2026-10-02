import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../config/generateToken.js";

const registerUser = async (
  email: string,
  password: string,
  displayName: string,
) => {
  // Check whether the email is already registered
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash the password before storing it
  const passwordHash = await bcrypt.hash(password, 12);

  // Create the user
  const user = await User.create({
    email,
    passwordHash,
    displayName,
  });

  const token = generateToken(user._id.toString());

  return { user, token };
};

const loginUser = async (email: string, password: string) => {
  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare the password provided by the user
  // with the hashed password stored in MongoDB
  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  // Update the user's last login time
  user.lastLoginAt = new Date();

  await user.save();

  const token = generateToken(user._id.toString());

  return { user, token };
};

export { registerUser, loginUser };
