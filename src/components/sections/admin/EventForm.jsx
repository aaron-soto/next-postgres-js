"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function EventForm() {
  const [formData, setFormData] = React.useState({
    eventName: "",
    eventDescription: "",
    date: new Date().toISOString().slice(0, 16), // Setting initial date value
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleFocus = (event) => {
    // Ensure the input stays in view on focus
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[500px] flex flex-col gap-4">
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="eventName">Event Name</Label>
        <Input
          id="eventName"
          name="eventName"
          value={formData.eventName}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
      </div>
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="eventDescription">Event Description</Label>
        <Input
          id="eventDescription"
          name="eventDescription"
          value={formData.eventDescription}
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
