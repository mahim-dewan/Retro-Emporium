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
import { allProducts, getAllCategories } from "@/lib/api";
import Link from "next/link";

const AdminProducts = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page) || 1;
  const { products, totalPages } = await allProducts({ page });
  const categories = await getAllCategories();

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
          {products?.map((product, i) => (
            <TableRow className={"border-gray-300"} key={i}>
              {/* Image  */}
              <TableCell className="font-medium w-20">
                <Link href={`/products/${product?._id}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.title || "Product image"}
                    width={1000}
                    height={1000}
                    className="w-16 h-16 rounded-lg"
                  />
                </Link>
              </TableCell>
              {/* Title  */}
              <TableCell className={"w-1/3 whitespace-normal"}>
                <Link href={`/products/${product?._id}`}>{product?.title}</Link>
              </TableCell>

              {/* Status for desktop  */}
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
                {categories?.find(
                  (category) => category._id === product.category_id
                )?.name || "N/A"}{" "}
              </TableCell>
              {/* SKU  */}
              <TableCell className={"text-center"}>{product.sku}</TableCell>
              {/* Price  */}
              <TableCell className={"text-center"}>
                {product.discountPrice || product.regularPrice}tk
              </TableCell>
              {/* 3dot menu  */}
              <TableCell className="text-right">
                <ProductDropdown product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Suspense fallback={<div>Loading...</div>}>
        <PaginationBox totalPages={totalPages} />
      </Suspense>
    </div>
  );
};

export default AdminProducts;
