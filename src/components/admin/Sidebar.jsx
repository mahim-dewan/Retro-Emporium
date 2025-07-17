"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";
// React Icons
import { IoIosHome } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { ImUsers } from "react-icons/im";
import { IoSettings } from "react-icons/io5";

// menu items
const menuList = [
  {
    name: "Dashboard",
    icon: <IoIosHome className="text-2xl text-dark" />,
    url: "/",
  },
  {
    name: "Product List",
    icon: <FaClipboardList className="text-2xl text-dark" />,
    url: "products",
  },
  {
    name: "Orders",
    icon: <TbTruckDelivery className="text-2xl text-dark" />,
    url: "orders",
  },
  {
    name: "Customers",
    icon: <ImUsers className="text-2xl text-dark" />,
    url: "customers",
  },
  {
    name: "Settings",
    icon: <IoSettings className="text-2xl text-dark" />,
    url: "settings",
  },
];

export function AdminSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className={"top-20 sticky mr-5"}
    >
      <SidebarTrigger
        className={` block cursor-pointer hover:text-retro ${
          open ? "ml-auto" : "mx-auto"
        }`}
      />
      {/* <SidebarHeader>Retro</SidebarHeader> */}
      <SidebarContent className={"border-none"}>
        <SidebarMenu>
          {menuList.map((item) => (
            <SidebarMenuItem className={"my-1 hover:shadow-lg "}>
              <SidebarMenuButton>
                <Link
                  href={`/admin/dashboard/${item.url}`}
                  className="flex gap-2 text-base font-semibold items-center"
                >
                  {item.icon}
                  {open && <span>{item.name}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
