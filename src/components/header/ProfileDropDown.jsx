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
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProfileDropDown({ children, position }) {
  const router = useRouter();

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
          className={`bg-white z-50 w-[200px] min-h-96 relative border-pastel-olive ${position}`}
        >
          <DropdownMenuLabel className={"text-lg font-bold"}>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
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
