"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import hero1 from "../../../public/hero/hero1.jpg";
import hero2 from "../../../public/hero/hero2.jpg";
import hero3 from "../../../public/hero/hero3.jpg";
import discount from "../../../public/hero/discount.jpg";
import superSale from "../../../public/hero/superSale.jpg";
import Image from "next/image";

const HeroSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col lg:flex-row justify-around gap-2">
      <Carousel
        plugins={[plugin.current]}
        className="w-full lg:w-6/8 h-[300px] lg:h-[400px]"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        opts={{ loop: true }}
      >
        <CarouselContent className={""}>
          {/* {Array.from({ length: 5 }).map((_, index) => ( */}
          <CarouselItem className={""}>
            <div className="p-1 w-full">
              <Card className={"p-0"}>
                <CardContent className="p-0">
                  <Image
                    alt="hero"
                    className="w-full h-[300px] lg:h-[400px] "
                    src={hero1}
                    width={500}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className={""}>
            <div className="p-1 w-full">
              <Card className={"p-0"}>
                <CardContent className="p-0">
                  <Image
                    alt="hero"
                    className="w-full h-[300px] lg:h-[400px]"
                    src={hero2}
                    width={500}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className={""}>
            <div className="p-1 w-full">
              <Card className={"p-0"}>
                <CardContent className="p-0">
                  <Image
                    alt="hero"
                    className="w-full h-[300px] lg:h-[400px]"
                    src={hero3}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          {/* ))} */}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      <div className="flex flex-row lg:flex-col items-start justify-between p-1 gap-[10px] lg:w-2/8">
        <Image
          alt="discount"
          src={discount}
          className="w-full sm:w-1/2 lg:w-full h-[200px] lg:h-[210px]"
        />
        <Image
          alt="discount"
          src={superSale}
          className="w-f24 sm:w-1/2 lg:w-full h-[200px]  lg:h-[180px]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
