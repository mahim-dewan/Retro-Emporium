import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

const ProductDropdown = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <HiDotsVertical className="cursor-pointer" size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={"bottom"}
        align={"end"}
        className={"box-shadow bg-white m-0"}
      >
        {/* Status  */}
        <div className={"lg:hidden"}>
          <Select>
            <SelectTrigger className="w-32 cursor-pointer font-semibold box-shadow border-2 m-0 focus-visible:ring-pastel-olive focus-visible:ring-2">
              <SelectValue placeholder="In stock" />
            </SelectTrigger>
            <SelectContent className={"bg-white border-pastel-olive "}>
              <SelectGroup>
                <DropdownMenuItem>
                  <SelectItem
                    className={"hover:bg-gray-300 cursor-pointer"}
                    value="In Stock"
                  >
                    In Stock
                  </SelectItem>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SelectItem
                    className={"hover:bg-gray-300 cursor-pointer"}
                    value="Upcoming"
                  >
                    Upcoming
                  </SelectItem>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SelectItem
                    className={"hover:bg-gray-300 cursor-pointer"}
                    value="Sold out"
                  >
                    Sold out
                  </SelectItem>
                </DropdownMenuItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Edit button  */}
        <DropdownMenuItem className={"py-0 hover:bg-gray-300 cursor-pointer"}>
          <Button className={"shadow-none p-0"}>Edit</Button>
        </DropdownMenuItem>

        {/* Delete button  */}
        <DropdownMenuItem className={"py-0 hover:bg-gray-300 cursor-pointer"}>
          <Button className={"shadow-none p-0 text-retro"}>Delete</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductDropdown;
