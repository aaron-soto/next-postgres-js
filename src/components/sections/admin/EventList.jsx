// EventList.js
"use client";

import React, { useState, useEffect } from "react";
import AdminSection from "@/app/admin/AdminSection";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const EventListItem = ({ event }) => {
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = months[eventDate.getMonth()]; // getMonth() returns the month index (0-11)

  return (
    <div className="flex items-center justify-between p-4 hover:bg-white/[2%] cursor-pointer">
      <div>
        <p className="text-lg font-bold">{event.title}</p>
        <p className="text-orange-400">{event.description}</p>
      </div>
      <div className="flex gap-2 text-xl">
        <p className="font-bold">{day}</p>
        <p>{month}</p>
      </div>
    </div>
  );
};

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventAdded = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Categorize events
  const todayEvents = [];
  const futureEvents = [];
  const passedEvents = [];

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate < today) {
      passedEvents.push(event);
    } else if (eventDate.getTime() === today.getTime()) {
      todayEvents.push(event);
    } else {
      futureEvents.push(event);
    }
  });

  return (
    <div>
      <AdminSection onEventAdded={handleEventAdded} />

      <div className="px-2 py-1 mt-4 bg-teal-600 md:py-2">Today</div>
      <div className="divide-y">
        {todayEvents.length > 0 ? (
          todayEvents.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))
        ) : (
          <p className="p-4">No events for today</p>
        )}
      </div>

      <div className="px-2 py-1 bg-gray-600 md:py-2">Future Events</div>
      <div className="divide-y">
        {futureEvents.length > 0 ? (
          futureEvents.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))
        ) : (
          <p className="p-4">No future events found</p>
        )}
      </div>

      <div className="px-2 py-1 bg-gray-400 md:py-2">Passed Events</div>
      <div className="divide-y">
        {passedEvents.length > 0 ? (
          passedEvents.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))
        ) : (
          <p className="p-4">No passed events found</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
