import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";

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
        <h1 className="text-3xl font-bold">Profile Page</h1>
        <Image
          src={session.user.image}
          alt="user profile image"
          width={50}
          height={50}
          className="rounded-full"
        ></Image>
        <p>Welcome, {session.user.name}</p>
        <p>{session.user.email}</p>
      </div>
    </>
  );
};

export default Page;
