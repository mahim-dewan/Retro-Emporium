import ProductDropdown from "@/components/admin/ProductDropdown";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React, { Suspense } from "react";
import { HiDotsVertical } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationBox from "@/components/product/PaginationBox";

const product = {
  status: "In stock",
  _id: "6855a86db5438d4e05e290bd",
  sku: "BEM-6505",
  name: "Duracell - AA 1.5V CopperTop Batteries (4-Pack)",
  type: "HardGood",
  price: 5.49,
  upc: "041333415017",
  category: "Fashion",
  shipping: 5.49,
  description:
    "Long-lasting energy; DURALOCK Power Preserve technology; for toys, clocks, radios, games, remotes, PDAs and more",
  manufacturer: "Duracell",
  model: "MN1500B4Z",
  url: "http://www.bestbuy.com/site/duracell-aa-1-5v-coppertop-batteries-4-pack/48530.p?id=1099385268988&skuId=48530&cmp=RMXCC",
  image:
    "http://img.bbystatic.com/BestBuy_US/images/products/4853/48530_sa.jpg",
};

const AdminProducts = () => {
  return (
    <div className="box-shadow w-full m-0">
      <div className=" flex items-center justify-between ">
        <h2 className="font-semibold">Products List</h2>
        <div className="flex items-center">
          <Select>
            <SelectTrigger className="w-fit btn-outline   m-0 focus-visible:ring-retro focus-visible:ring-1">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className={"bg-white border-pastel-olive "}>
              <SelectGroup>
                <SelectItem
                  className={"hover:bg-gray-300 cursor-pointer"}
                  value="Name"
                >
                  Name
                </SelectItem>
                <SelectItem
                  className={"hover:bg-gray-300 cursor-pointer"}
                  value="Latest"
                >
                  Latest
                </SelectItem>
                <SelectItem
                  className={"hover:bg-gray-300 cursor-pointer"}
                  value="Oldest"
                >
                  Oldest
                </SelectItem>
                <SelectItem
                  className={"hover:bg-gray-300 cursor-pointer"}
                  value="Highest Price"
                >
                  Highest Price
                </SelectItem>
                <SelectItem
                  className={"hover:bg-gray-300 cursor-pointer"}
                  value="Lowest Price"
                >
                  Lowest Price
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className={"btn-fill my-0"}>Create</Button>
        </div>
      </div>

      {/* Products Table  */}
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">Image</TableHead>
            <TableHead className={"max-w-24 text-wrap"}>Title</TableHead>
            <TableHead className={"text-center hidden lg:table-cell"}>
              Status
            </TableHead>
            <TableHead className={"text-center hidden lg:table-cell"}>
              Category
            </TableHead>
            <TableHead className={"text-center"}>SKU</TableHead>
            <TableHead className={"text-center"}>Price</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow className={"border-gray-300"} key={i}>
              {/* Image  */}
              <TableCell className="font-medium w-20">
                <Image
                  src={product.image}
                  alt="image"
                  width={1000}
                  height={1000}
                  className="w-16 h-16 rounded-lg"
                />
              </TableCell>
              {/* Title  */}
              <TableCell className={"w-1/3 whitespace-normal"}>
                {product.name}
              </TableCell>
              {/* Status  */}
              <TableCell
                className={"text-center w-0 m-0 p-0 hidden lg:table-cell"}
              >
                <Select className="w-fit">
                  <SelectTrigger className="w-32 cursor-pointer font-semibold box-shadow border-2 m-0 focus-visible:ring-pastel-olive focus-visible:ring-2">
                    <SelectValue placeholder="In stock" />
                  </SelectTrigger>
                  <SelectContent className={"bg-white border-pastel-olive "}>
                    <SelectGroup>
                      <SelectItem
                        className={"hover:bg-gray-300 cursor-pointer"}
                        value="In Stock"
                      >
                        In Stock
                      </SelectItem>
                      <SelectItem
                        className={"hover:bg-gray-300 cursor-pointer"}
                        value="Upcoming"
                      >
                        Upcoming
                      </SelectItem>
                      <SelectItem
                        className={"hover:bg-gray-300 cursor-pointer"}
                        value="Sold out"
                      >
                        Sold out
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              {/* Category  */}
              <TableCell className={"text-center hidden lg:table-cell"}>
                {product.category}
              </TableCell>
              {/* SKU  */}
              <TableCell className={"text-center"}>{product.sku}</TableCell>
              {/* Price  */}
              <TableCell className={"text-center"}>
                {product.price} tk
              </TableCell>
              {/* 3dot menu  */}
              <TableCell className="text-right">
                <ProductDropdown />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Suspense fallback={<div>Loading...</div>}>
        <PaginationBox totalPages={5} />
      </Suspense>
    </div>
  );
};

export default AdminProducts;
