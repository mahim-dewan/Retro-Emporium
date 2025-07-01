import AllProducts from "@/components/product/AllProducts";
import CategoryFeature from "@/components/product/CategoryFeature";
import HeroSection from "@/components/rootPage/HeroSection";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Suspense } from "react";
import paymentMethods from "../../public/paymentMethods.png";
import CategoryMenuList from "@/components/product/CategoryMenuList";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session called", session);

  return (
    <div>
      {/* Category menu  */}
      <div className="hidden md:block">
        <CategoryMenuList />
      </div>

      {/* Hero area  */}
      <HeroSection />

      {/* Category Features  */}
      <CategoryFeature />

      {/* Products  */}
      <div className="mt-10">
        <h1 className="title">Just for you</h1>
        <p className="text-center mx-4 mb-10">
          Check & Get Your Desired Product!
        </p>

        <Suspense fallback={<div>Loading..........</div>}>
          <AllProducts />
        </Suspense>
      </div>

      {/* Payment methods  */}
      <div className="p-5 bg-gray-200 my-10">
        <h3 className="title mb-6">Payment Methods</h3>
        <div className="lg:flex gap-3">
          <div className="flex-1">
            <Image
              alt="payment methods"
              src={paymentMethods}
              className="w-full mx-auto"
            />
          </div>
          <div className="p-4 flex-1 w-28 h-28 shadow text-center text-retro font-bold rounded-lg hidden lg:block">
            <h2>DBID</h2>
            <p>852654789</p>
          </div>
        </div>
      </div>
    </div>
  );
}
