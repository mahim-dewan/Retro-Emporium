"use client";
import React, { useState } from "react";
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
import Image from "next/image";
import logo from "../../../public/Retro-logo.png";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import { useAppContext } from "@/context/AppContext";

const RegisterForm = ({ className, ...props }) => {
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const {
    openRegisterForm,
    setOpenRegisterForm,
    openLoginForm,
    setOpenLoginForm,
  } = useAppContext();

  // onChange handler
  const onChangeHandler = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  // submit handler
  const submitHandler = async (e) => {
    console.log(newUser);
    e.preventDefault();

    try {
      if (newUser.password !== newUser.confirmPass)
        return toast.warning("Password doesn't matched");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...newUser }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) return toast.error(data?.message);

      setNewUser({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPass: "",
      });

      // redirect to login page
      toast.success(data?.message);
      setOpenRegisterForm(false);
      setOpenLoginForm(true);
    } catch (err) {
      toast(err?.message);
      console.log(err?.message);
    }
  };

  if (!openRegisterForm) return null;

  // JSX Start
  return (
    <div className="w-full h-[110%] bg-white/50 fixed -top-10 z-50">
      <div className="py-5">
        <div
          className={cn(
            "flex flex-col gap-2 mt-20 w-[350px] md:w-[450px] 2xl:w-[600px] mx-auto my-5 bg-pastel-olive text-dark rounded-xl relative",
            className
          )}
          {...props}
        >
          {/* Form Close Button  */}
          <IoClose
            onClick={() => setOpenRegisterForm(false)}
            className="text-retro text-3xl 2xl:text-5xl cursor-pointer font-bold absolute top-2 right-2 "
          />

          <Card>
            <CardHeader className="text-center gap-0">
              <Image
                alt="logo"
                src={logo}
                width={150}
                className="mx-auto 2xl:w-52"
              />
              <CardTitle className="text-xl 2xl:text-2xl">
                Create an account
              </CardTitle>
            </CardHeader>

            {/* Input Form  */}
            <CardContent>
              <form onSubmit={submitHandler}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <div className="flex md:flex-row flex-col justify-between gap-2">
                      <div className="grid col-16 md:col-8 gap-3">
                        <Label htmlFor="fname">First Name</Label>
                        <Input
                          id="fname"
                          type="text"
                          placeholder="Mahim"
                          required
                          name="firstname"
                          value={newUser.firstname}
                          onChange={onChangeHandler}
                        />
                      </div>
                      <div className="grid col-16 md:col-8 gap-3">
                        <Label htmlFor="lname">Last Name</Label>
                        <Input
                          id="lname"
                          type="text"
                          placeholder="Dewan"
                          required
                          name="lastname"
                          value={newUser.lastname}
                          onChange={onChangeHandler}
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        name="email"
                        value={newUser.email}
                        onChange={onChangeHandler}
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="s@i3*L#007"
                        required
                        name="password"
                        value={newUser.password}
                        onChange={onChangeHandler}
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="confirm-password">
                          Confirm Password
                        </Label>
                      </div>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="s@i3*L#007"
                        required
                        name="confirmPass"
                        value={newUser.confirmPass}
                        onChange={onChangeHandler}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full mx-auto mb-0 btn-fill text-white 2xl:text-2xl 2xl:py-6"
                    >
                      Resister
                    </Button>
                  </div>
                  <div className="text-center text-sm 2xl:text-xl">
                    Already have an account?{" "}
                    <Button
                      onClick={() => {
                        setOpenRegisterForm(false);
                        setOpenLoginForm(true);
                      }}
                      className="underline underline-offset-4 2xl:text-xl p-0 cursor-pointer hover:text-retro"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>

            {/* Terms & Conditions  */}
            <div className="text-muted-foreground 2xl:text-xl *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </Card>
          {/* <ToastContainer autoClose={2000} /> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
