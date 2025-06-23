"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import gmail from "../../../public/gmail.png";
import facebook from "../../../public/facebook.png";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {
    openLoginForm,
    setOpenLoginForm,
    openRegisterForm,
    setOpenRegisterForm,
  } = useAppContext();

  const loginHandler = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log(result);
    if (result.error) return toast.error(result.error);
    setEmail("");
    setPassword("");
    toast.success("Login successful", {
      onClose: () => router.push("/"),
    });
    setOpenLoginForm(false);
  };

  if (!openLoginForm) return null;

  // JSX Start
  return (
    <div className="w-full h-screen bg-white/50 fixed top-0 z-50">
      <div
        className={cn(
          "flex flex-col gap-2 w-[350px] 2xl:w-[600px] mx-auto my-5 bg-pastel-olive rounded-xl relative",
          className
        )}
        {...props}
      >
        {/* Form Close Button  */}
        <IoClose
          onClick={() => setOpenLoginForm(false)}
          className="text-retro text-3xl cursor-pointer font-bold absolute top-2 right-2 "
        />

        {/* Overlay background */}

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl 2xl:text-3xl">Welcome back</CardTitle>
            <CardDescription className={"2xl:text-2xl"}>
              Login with your Facebook or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid ">
                {/* Continue with Google & Facebook  */}
                <div className="grid md:grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full 2xl:py-6">
                    <Image
                      alt="facebook"
                      src={facebook}
                      width={25}
                      className="2xl:w-10"
                    />
                    <span className="text-base 2xl:text-xl">Facebook</span>
                  </Button>
                  <Button variant="outline" className="w-full 2xl:py-6">
                    <Image
                      alt="gmail"
                      src={gmail}
                      width={25}
                      className="2xl:w-10"
                    />
                    <span className="text-base 2xl:text-xl">Google</span>
                  </Button>
                </div>

                {/* Divider  */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="h-px flex-1 bg-dark" />
                  <span className=" 2xl:text-xl">Or continue with</span>
                  <div className="h-px flex-1 bg-dark" />
                </div>

                {/* Input Form  */}
                <div className="grid gap-3">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline 2xl:text-xl"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="s@i3*L#007"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full mx-auto btn-fill text-white 2xl:text-2xl 2xl:py-6"
                    onClick={loginHandler}
                  >
                    Login
                  </Button>
                </div>

                {/* Go to for Register  */}
                <div className="text-center text-sm 2xl:text-xl">
                  Don&apos;t have an account?{" "}
                  <Button
                    onClick={() => {
                      setOpenLoginForm(false);
                      setOpenRegisterForm(true);
                    }}
                    className="underline underline-offset-4 2xl:text-xl p-0 cursor-pointer hover:text-retro"
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Terms & Conditions  */}
          <div className="text-muted-foreground  2xl:text-xl *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </Card>
      </div>
      {/* <ToastContainer autoClose={2000} /> */}
    </div>
  );
}
