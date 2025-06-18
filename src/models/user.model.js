const { default: mongoose, model } = require("mongoose");
import bcrypt from "bcryptjs";

// User Schema defined
const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: [3, "password lenght must be at least 8 character"],
      maxLength: [12, "password length should be less than 12 character"],
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Pre Hook
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// User model defined
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
