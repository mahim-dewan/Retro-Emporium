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
import { LuClipboardList } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import {  PiUsersBold } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";

// menu items
const menuList = [
  {
    name: "Dashboard",
    icon: <IoHomeOutline className="text-2xl text-dark" />,
    url: "/",
  },
  
  {
    name: "Orders",
    icon: <TbTruckDelivery className="text-2xl text-dark" />,
    url: "orders",
  },
  {
    name: "Products ",
    icon: <LuClipboardList className="text-2xl text-dark" />,
    url: "products",
  },
  {
    name: "Categories",
    icon: <MdOutlineCategory className="text-2xl text-dark" />,
    url: "categories",
  },
  {
    name: "Customers",
    icon: <PiUsersBold className="text-2xl text-dark" />,
    url: "customers",
  },
];

export function AdminSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon" className={"top-16 sticky "}>
      <SidebarTrigger
        className={` block cursor-pointer hover:text-retro ${
          open ? "ml-auto" : "mx-auto"
        }`}
      />
      {/* <SidebarHeader>Retro</SidebarHeader> */}
      <SidebarContent className={"border-none"}>
        <SidebarMenu>
          {menuList.map((item) => (
            <SidebarMenuItem
              key={item.name}
              className={"my-1 hover:shadow-lg "}
            >
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
