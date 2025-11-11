"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

/* ------------------ Reusable InputBox ------------------ */
const InputBox = ({
  label,
  placeholder,
  type = "text",
  required = false,
  className,
  name,
  onChange,
  value,
}) => (
  <div className={`flex items-center justify-around my-5 ${className}`}>
    <Label htmlFor={label} className={"flex-1/4 text-md lg:ml-5"}>
      {label} <span className="text-retro">{required && "*"}</span>
    </Label>
    <Input
      name={name}
      type={type}
      id={label}
      className={`bg-white flex-2/4 text-dark border-none focus:outline-none lg:ml-5`}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
  </div>
);

/* ------------------ Default State ------------------ */
const defaultState = {
  name: "",
  number: "",
  email: "",
  district: "",
  thana: "",
  postCode: "",
  addr: "",
  notes: "",
  totalAmount: 0,
};

/* ------------------ Checkout Component ------------------ */
const Checkout = () => {
  const [orderData, setOrderData] = useState(defaultState);
  const router = useRouter();

  useEffect(() => {
    const checkoutData = JSON.parse(sessionStorage.getItem("checkoutItems"));
    if (checkoutData) {
      setOrderData((prev) => ({ ...prev, ...checkoutData }));
    }
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle continue button
  const handleContinue = (e) => {
    e.preventDefault();
    sessionStorage.setItem("orderData", JSON.stringify(orderData));
    setOrderData(defaultState);
    router.push("/store/checkout/payment");
  };

  return (
    <div className="">
      <div className="min-h-screen p-2 bg-pastel-olive text-dark ">
        <h2 className="text-2xl font-semibold my-5 text-center">
          Shiping Address
        </h2>

        <form
          onSubmit={handleContinue}
          className="w-full lg:w-4/5 mx-auto h-fit  p-2 md:p-10 "
        >
          {/* Full Name + Phone */}
          <div className="md:grid grid-cols-2 gap-2 ">
            <InputBox
              label={"Full Name"}
              placeholder={"Mahim Dewan"}
              required={true}
              name={"name"}
              value={orderData.name}
              onChange={handleChange}
            />

            <InputBox
              label={"Phone Number"}
              placeholder={"01869709698"}
              required={true}
              name={"number"}
              value={orderData.number}
              onChange={handleChange}
            />
          </div>

          {/* Email + District */}
          <div className="md:grid grid-cols-2 gap-2">
            <InputBox
              label={"Email"}
              placeholder={"mahimdewan79@gmail.com"}
              name={"email"}
              value={orderData.email}
              onChange={handleChange}
            />

            <InputBox
              label={"District"}
              placeholder={"Narayanganj"}
              required={true}
              name={"district"}
              value={orderData.district}
              onChange={handleChange}
            />
          </div>

          {/* Thana + Post Code */}
          <div className="flex gap-2">
            <InputBox
              label={"Thana"}
              placeholder={"Bondor"}
              required={true}
              className={"flex-col md:flex-row items-start flex-1/2"}
              name={"thana"}
              value={orderData.thana}
              onChange={handleChange}
            />
            <InputBox
              label={"Post Code"}
              placeholder={"1414"}
              className={"flex-col md:flex-row items-start flex-1/2"}
              type="number"
              name={"postCode"}
              value={orderData.postCode}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <InputBox
            required={true}
            label={"Area/Road/House/Village"}
            placeholder={"Modonganj, Gharmora"}
            className={"flex-col md:flex-row items-start"}
            name={"addr"}
            value={orderData.addr}
            onChange={handleChange}
          />

          {/* Notes */}
          <div>
            <h2 className="text-md font-semibold">Notes</h2>

            <textarea
              rows={2}
              className="bg-white w-full rounded-md p-2 text-dark border-none focus:outline-none"
              placeholder="Write a message"
              name="notes"
              value={orderData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Continue Button */}
          <Button type={"submit"} className={"btn-fill"}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
