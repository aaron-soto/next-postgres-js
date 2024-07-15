import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import AdminSection from "./AdminSection";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== "DEV" && session.user.role !== "ADMIN")
  ) {
    redirect("/");
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container py-36">
        <h1 className="text-3xl font-bold">Admin Page</h1>
        <AdminSection />
      </div>
    </>
  );
};

export default Page;
