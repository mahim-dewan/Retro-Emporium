import OTP from "@/models/otp.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();

  try {
    // Email and OTP available from frontend
    if (!email)
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );

    // Does user exists
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { message: "User not found. Please register" },
        { status: 404 }
      );

    // Check is already verified
    if (user.isVerified)
      return NextResponse.json(
        { message: "User already verified" },
        { status: 400 }
      );

    // Delete previous otp
    await OTP.deleteMany({ email });
    // Create a new otp
    const otp = new OTP({ email });
    await otp.save();
    // Final Response
    return NextResponse.json({ message: "We resent another OTP" });
  } catch (err) {
    NextResponse.json({ message: err?.message });
  }
}
