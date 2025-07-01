import CartItem from "@/components/product/CartItem";
import { Input } from "@/components/ui/input";
import Button from "@/components/utils/Button";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

const products = [
  {
    _id: "6855a86db5438d4e05e290be",
    sku: "127687",
    name: "Duracell - AA Batteries (8-Pack)",
    type: "HardGood",
    price: 7.49,
    category: "Fashion",
    description:
      "Compatible with select electronic devices; AA size; DURALOCK Power Preserve technology; 8-pack",
    image:
      "http://img.bbystatic.com/BestBuy_US/images/products/1276/127687_sa.jpg",
    name: "Duracell - AA Batteries (8-Pack) Compatible with select electronic devices",
    price: 7.49,
    shipping: 5.49,
    sku: "127687",
    type: "HardGood",
    upc: "041333825014",
    url: "http://www.bestbuy.com/site/duracell-aa-batteries-8-pack/127687.p?id=1051384045676&skuId=127687&cmp=RMXCC",
    _id: "6855a86db5438d4e05e290be",
  },
];

const Cart = () => {
  return (
    <div className="min-h-screen p-4 flex flex-col lg:flex-row gap-2">
      <ul className="w-full lg:w-3/4">
        <li className="bg-pastel-olive p-4 hidden md:grid grid-cols-4 justify-around text-md font-bold my-5 rounded-lg">
          <h2 className="col-span-2">Product</h2>
          <h2 className="text-center">Price</h2>
          <h2 className="text-center">Quantity</h2>
        </li>

        {products.map((product) => (
          <CartItem key={product._id} product={product} />
        ))}
      </ul>

      {/* Checkout box  */}
      <div className="w-full lg:w-1/4  ">
        <div className="box-shadow bg-pastel-olive max-w-[450px] h-fit sticky top-24 mx-auto">
          {/* Location  */}
          <div className="flex flex-col items-start gap-2 border-b border-gray-300 pb-3 ">
            <h3>Location</h3>
            <span className="flex items-center gap-2">
              <CiLocationOn />
              <p className="font-semibold"> Bandor, Narayanganj, Dhaka</p>
            </span>
          </div>

          {/* Order Summary  */}
          <div className="border-b border-gray-300 pb-4">
            <h2 className="text-xl font-bold my-2">Order Summary</h2>
            <div className="flex items-center justify-between px-2">
              <span>Subtotal items</span>
              <span className="font-semibold">TK 550</span>
            </div>
            <div className="flex items-center justify-between px-2">
              <span>Shipping Fee</span>
              <span className="font-semibold">TK 150</span>
            </div>
          </div>

          {/* Intotal  */}
          <div className="flex items-center justify-between p-2">
            <span className="text-xl font-bold">Total</span>
            <span className="font-semibold">TK 700</span>
          </div>

          {/* Voucher token  */}
          <div className="flex w-full max-w-sm items-center mx-auto my-2">
            <Input type="email" placeholder="Coupon Code" className={"py-5"} />
            <Button className={"btn-fill"}>Apply</Button>
          </div>

          <Button className={"mx-auto w-full btn-fill text-lg"}>
            PROCEED TO CHECKOUT (1)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
