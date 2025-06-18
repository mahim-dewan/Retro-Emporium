"use client";
import { useAppContext } from "@/context/AppContext";
import { useSession } from "next-auth/react";
import React from "react";

const Products = () => {
  const { data: session } = useSession();
  console.log(session?.user);

  const { openForm } = useAppContext();
  console.log(openForm);

  return <div>{session?.user?.name}</div>;
};

export default Products;
