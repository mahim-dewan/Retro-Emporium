import OTP from "@/models/otp.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, otp } = await req.json();

  try {
    // Email and OTP available from frontend
    if (!email || !otp)
      return NextResponse.json(
        { message: "Email and OTP is required" },
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

    // is OTP Matched
    const isOtpExists = await OTP.findOne({ email, otp });
    if (!isOtpExists)
      return NextResponse.json(
        {
          message: "OTP doesn't matched. Please try again.",
        },
        { status: 401 }
      );

    // Update user isVerified field
    await User.findOneAndUpdate({ email }, { isVerified: true });
    // Delete otp after verify
    await OTP.deleteMany({ email });

    // Success Response
    return NextResponse.json(
      { message: "Verification Successfull" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({
      message: err?.message || "Something went wrong",
    });
  }
}
