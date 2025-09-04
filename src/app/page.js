import CategoryFeature from "@/components/product/CategoryFeature";
import HeroSection from "@/components/rootPage/HeroSection";
import Image from "next/image";
import { Suspense } from "react";
import paymentMethods from "../../public/paymentMethods.png";
import CategoryMenuList from "@/components/product/CategoryMenuList";
import JustForYouProducts from "@/components/product/JustForYouProducts";

export default function Home() {
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
      <Suspense
        fallback={
          <div className="mx-auto my-10 text-2xl">Loading..........</div>
        }
      >
        <div className="mt-10">
          <h1 className="title">Just for you</h1>
          <p className="text-center mx-4 mb-10">
            Check & Get Your Desired Product!
          </p>

          <JustForYouProducts />
        </div>
      </Suspense>

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
