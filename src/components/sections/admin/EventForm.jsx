"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function EventForm({ onEventAdded }) {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 16),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      date: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Adjust the date to local timezone before sending
      const localDate = new Date(formData.date);
      const adjustedDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000
      ).toISOString();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, date: adjustedDate }),
        }
      );

      if (!response.ok) {
        console.error("Failed to add event:", response.statusText);
        throw new Error(`Failed to add event: ${response.statusText}`);
      }

      const newEvent = await response.json();
      onEventAdded(newEvent);
      setFormData({
        title: "",
        description: "",
        date: new Date().toISOString().slice(0, 16),
      }); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding event:", error);
      // Handle the error accordingly, maybe set an error state or show a message in the UI
    }
  };

  const handleFocus = (event) => {
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[500px] flex flex-col gap-4">
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="title">Event Name</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
      </div>
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="description">Event Description</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
      </div>
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="date">Select Date:</Label>
        <input
          className="p-2 text-white bg-transparent border rounded-md date-input"
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleDateChange}
          onFocus={handleFocus}
        />
      </div>
      <Button type="submit" className="text-white bg-orange-400">
        Save Event
      </Button>
    </form>
  );
}
