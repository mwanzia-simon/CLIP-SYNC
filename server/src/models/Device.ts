import mongoose, { Document, Schema } from "mongoose";

export interface IDevice extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: "desktop" | "mobile" | "tablet" | "web";
  platform: "Windows" | "macOS" | "Linux" | "Android" | "iOS" | "Web";
  deviceIdentifier: string;
  isOnline: boolean;
  lastSeenAt?: Date;
  pairedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const deviceSchema = new Schema<IDevice>(
  {
    // The user who owns this device
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    // Friendly name shown to the user
    // Example: "Simon's Laptop"
    name: {
      type: String,
      required: [true, "Device name is required"],
      trim: true,
      minlength: [2, "Device name must be at least 2 characters"],
      maxlength: [50, "Device name cannot exceed 50 characters"],
    },

    // The type of device
    type: {
      type: String,
      enum: ["desktop", "mobile", "tablet", "web"],
      required: [true, "Device type is required"],
    },

    // Operating system/platform
    platform: {
      type: String,
      enum: ["Windows", "macOS", "Linux", "Android", "iOS", "Web"],
      required: [true, "Device platform is required"],
    },

    // Unique identifier for this installation/device
    deviceIdentifier: {
      type: String,
      required: [true, "Device identifier is required"],
      unique: true,
      trim: true,
    },

    // Used to know whether the device is currently connected
    isOnline: {
      type: Boolean,
      default: false,
    },

    // Last time the device communicated with ClipSync
    lastSeenAt: {
      type: Date,
    },

    // When this device was paired with the account
    pairedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.model<IDevice>("Device", deviceSchema);

export default Device;