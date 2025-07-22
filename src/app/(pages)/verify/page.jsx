"use client";
import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthModalsContext } from "@/context/authModalsContext";
import {
  useEmailVerifyMutation,
  useResendOTPMutation,
} from "@/features/api/apiSlice";
import { Button } from "@/components/ui/button";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [secondLeft, setSecondLeft] = useState(120);
  const [email, setEmail] = useState("");
  const { setOpenLoginForm } = useAuthModalsContext();
  const router = useRouter();
  const [emailVerify, { data, isError, isLoading, isSuccess }] =
    useEmailVerifyMutation();
  const [resendOTP] = useResendOTPMutation();

  // Verify submit button
  const handleVerify = async () => {
    try {
      const res = await emailVerify({ email, otp });

      if (res?.error) return toast.error(res.error?.data?.message);
      setOtp("");
      toast.success(res.data.message);
      router.replace("/");
      setOpenLoginForm(true);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  // Resend OTP handler
  const handleResend = async () => {
    try {
      const res = await resendOTP({ email });
      if (res?.error) return toast.error(res.error?.data?.message);
      setOtp("");
      setSecondLeft(120);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    // If email isn't available
    if (!sessionStorage.getItem("registerEmail")) return router.replace("/");
    setEmail(sessionStorage.getItem("registerEmail"));

    // Verification time
    if (secondLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondLeft]);

  // make time format
  const timeFormat = (second) => {
    let m = Math.floor(second / 60);
    let s = second % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // JSX
  return (
    <div className="min-h-screen">
      <div className="w-7/8 max-w-[500px] md:w-[500px] bg-pastel-olive p-4 m-4 mx-auto rounded-lg">
        <h1 className="title text-dark">OTP Verification</h1>
        <p className="text-dark my-5">
          Please check your email :{" "}
          <span className="bg-retro px-1 text-white font-bold">{email}</span>{" "}
          and enter the OTP sent to your registered email to complete your
          verification.
        </p>
        <div className="mx-auto my-5">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot
                className={" ring-retro border-retro text-xl"}
                index={0}
              />
              <InputOTPSlot
                className={" ring-retro border-retro text-xl"}
                index={1}
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot
                className={" ring-retro border-retro text-xl"}
                index={2}
              />
              <InputOTPSlot
                className={" ring-retro border-retro text-xl"}
                index={3}
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot
                className={" ring-retro border-retro text-xl"}
                index={4}
              />
              <InputOTPSlot
                className={" ring-retro border-retro text-xl"}
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          <div className="flex items-center justify-between my-3">
            <p>Remaining Time : {timeFormat(secondLeft)} </p>
            <Button
              className={"underline cursor-pointer hover:text-retro"}
              onClick={() => handleResend()}
            >
              Resend
            </Button>
          </div>
          <div className="mt-5">
            <Button
              disabled={isLoading}
              className={"btn-fill my-1 w-full"}
              onClick={() => handleVerify()}
            >
              {isLoading ? "Verifing..." : "Verify"}
            </Button>
            <Button
              className={"btn-outline my-1 w-full"}
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
