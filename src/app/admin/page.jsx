// page.tsx
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import AdminSection from "./AdminSection";
import EventList from "@/components/sections/admin/EventList";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== "DEV" && session.user.role !== "ADMIN")
  ) {
    redirect("/");
    return null;
  }

  let events = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`, // Ensure you have accessToken in your session
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch events:", response.statusText);
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    events = await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    // Handle the error accordingly, maybe set an error state or show a message in the UI
  }

  return (
    <>
      <Navbar />
      <div className="container py-36">
        <h1 className="text-3xl font-bold">Admin Page</h1>
        <EventList initialEvents={events} />
      </div>
    </>
  );
};

export default Page;
