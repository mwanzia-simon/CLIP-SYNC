import bcrypt from "bcryptjs";
import User from "../models/User.js";

const registerUser = async (
  email: string,
  password: string,
  displayName: string
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

  return user;
};

export { registerUser };