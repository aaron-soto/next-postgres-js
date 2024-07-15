import React from "react";
import Navbar from "@/components/Navbar/Navbar";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="container py-36">
        <h1 className="text-3xl font-bold">Profile Page</h1>
        <p>This is the profile page.</p>
      </div>
    </>
  );
};

export default Page;
