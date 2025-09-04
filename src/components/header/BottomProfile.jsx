"use client";
import React from "react";
import Button from "../utils/Button";
import { ProfileDropDown } from "./ProfileDropDown";
import { PiUserListFill } from "react-icons/pi";
import { useAuthModalsContext } from "@/context/authModalsContext";

const BottomProfile = ({ user }) => {
  const { setOpenLoginForm } = useAuthModalsContext();
  return (
    <Button className={"flex flex-col items-center text-sm"}>
      {user ? (
        <ProfileDropDown position={"left-[30px]"}>
          <PiUserListFill size={26} />
          Profile
        </ProfileDropDown>
      ) : (
        <div onClick={() => setOpenLoginForm(true)}>
          <PiUserListFill size={26} />
          Profile
        </div>
      )}
    </Button>
  );
};

export default BottomProfile;
