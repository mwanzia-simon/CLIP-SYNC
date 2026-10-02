import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService.js";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, displayName } = req.body;

    const { user } = await registerUser(email, password, displayName);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const { user } = await loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};

export { register, login };
