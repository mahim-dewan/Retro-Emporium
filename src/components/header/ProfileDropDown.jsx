"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Button from "../utils/Button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProfileDropDown({ children, position }) {
  const router = useRouter();
  const { data } = useSession();
  const { name, email } = data.user;

  // Log out handler
  const handleLogOut = async () => {
    await signOut({ redirect: false });
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="md:mx-5 md:my-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        {/* Dropdown Content  */}
        <DropdownMenuContent
          sideOffset={10}
          align="end"
          className={`bg-white z-50 w-[250px] min-h-96 relative border-pastel-olive ${position}`}
        >
          {/* Image and Name  */}
          <DropdownMenuLabel
            className={
              "text-lg flex items-center justify-start flex-wrap gap-2 border-b border-gray-300"
            }
          >
            <Image
              src={
                "https://images.unsplash.com/photo-1753334479971-573a6e1e0bad?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              width={100}
              height={100}
              alt="profile"
              className="w-10 h-10 rounded-full border border-retro"
            />
            <div className="">
              <h3 className="text-lg">{name}</h3>
              <p className="text-[12px] font-normal">{email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Items  */}
          <DropdownMenuItem
            asChild
            className={
              "cursor-pointer  hover:rounded-lg text-md font-semibold hover:shadow-sm shadow-dark"
            }
          >
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className={
              "cursor-pointer  hover:rounded-lg text-md font-semibold hover:shadow-sm shadow-dark"
            }
          >
            <Link href={"/admin/dashboard"}>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className={
              "cursor-pointer  hover:rounded-lg text-md font-semibold hover:shadow-sm shadow-dark"
            }
          >
            <Link href={"/team"}>Team</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className={
              "cursor-pointer  hover:rounded-lg text-md font-semibold hover:shadow-sm shadow-dark"
            }
          >
            <Link href={"/setting"}>Setting</Link>
          </DropdownMenuItem>

          {/* Log Out button  */}
          <DropdownMenuItem
            className={
              " rounded-none m-0 absolute bottom-0 left-0 border-pastel-olive border-t w-full"
            }
          >
            <Button
              handler={handleLogOut}
              className={
                "cursor-pointer text-md text-center font-semibold hover:shadow-sm shadow-dark w-full p-2 rounded-lg"
              }
            >
              Sign Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
