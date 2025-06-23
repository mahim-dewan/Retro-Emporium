"use client";
import React from "react";
import Button from "../utils/Button";
import { useAppContext } from "@/context/AppContext";
import { signOut, useSession } from "next-auth/react";

const Menubar = () => {
  const { setOpenLoginForm, setOpenRegisterForm } = useAppContext();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <div className="flex items-center justify-end">
      {/* Login and Register Button */}
      {user ? (
        <Button
          handler={() => signOut({ redirect: false })}
          className={"btn-fill"}
        >
          Sign Out
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            handler={() => setOpenLoginForm(true)}
            className="btn-outline"
          >
            Login
          </Button>
          <Button
            handler={() => setOpenRegisterForm(true)}
            className="btn-fill text-white"
          >
            Resister
          </Button>
        </div>
      )}
    </div>
  );
};

export default Menubar;
