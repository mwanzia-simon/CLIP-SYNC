import { Request, Response } from "express";
import User from "../models/User.js";

const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });

      return;
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get current user",
    });
  }
};

export { getCurrentUser };