import Image from "next/image";
import React from "react";
import logo from "../../../public/Retro-logo.png";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 py-8 mt-10 w-full">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Logo and Description */}
            <div className="flex-1/4">
              <Image alt="logo" src={logo} className="w-32 bg-white/50" />
              <p className="mt-2 text-sm">
                Bringing you the best retro collections with love and quality.
              </p>
            </div>

            <div className="flex items-start justify-around flex-2/4">
              {/* About us */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  About Us
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <a href="/" className="hover:text-white">
                      Affiliate Program
                    </a>
                  </li>
                  <li>
                    <a href="/shop" className="hover:text-white">
                      Online Delivery
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="hover:text-white">
                      Refund and Return Policy
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-white">
                      Terms and Conditions
                    </a>
                  </li>
                </ul>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Quick Links
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <a href="/" className="hover:text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/shop" className="hover:text-white">
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="hover:text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* address  */}
            <div className="flex-1/4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Address
              </h3>
              <h2>Retro Emporium</h2>
              <p>
                Head Office: 28 Kazi Nazrul Islam Ave,Navana Zohura Square,
                Dhaka 1000
              </p>
              <p>
                Email:{" "}
                <a href="mailto:retroemporiumm@gmail.com">
                  retroemporiumm@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="my-5 justify-items-center">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="flex space-x-4 mt-4 text-2xl lg:text-3xl">
              <AiFillFacebook />
              <AiFillInstagram />
              <AiFillTwitterCircle />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Retro Emporium. All rights
            reserved.
          </p>
          <p>Developed by Mahim Dewan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
