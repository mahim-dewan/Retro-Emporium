"use client";
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
import { useEditModalContext } from "@/context/EditFormModalContext";
import { useDeleteProductMutation } from "@/features/api/apiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProductDropdown = ({ product }) => {
  const router = useRouter();
  const { editMode, setEditMode, setSelectedProduct } = useEditModalContext();
  const [deleteProduct, { data }] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteProduct(product?._id).unwrap();
      toast.warn(res?.message || "Product deleted successfully");
      router.refresh();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete product");
    }
  };

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
        <DropdownMenuItem
          className={
            "py-0 hover:bg-gray-300 shadow-none p-2 font-semibold cursor-pointer"
          }
          onClick={() => {
            setSelectedProduct(product);
            setEditMode(true);
          }}
        >
          Edit
        </DropdownMenuItem>

        {/* Delete button  */}
        <DropdownMenuItem
          className={
            "py-0 hover:bg-gray-300 shadow-none p-2 font-semibold text-retro cursor-pointer"
          }
          onClick={handleDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductDropdown;
