"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { formatTupleDate } from "@/lib/utils";

const EventsSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const todayEvents = [];
  const futureEvents = [];
  const passedEvents = [];

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate < currentDate) {
      passedEvents.push(event);
    } else if (eventDate.getTime() === currentDate.getTime()) {
      todayEvents.push(event);
    } else {
      futureEvents.push(event);
    }
  });

  return (
    <div className="bg-[#0c0b09] py-16">
      <div className="container">
        <SectionHeading
          className="pb-4"
          title="Events"
          description="What is happening at Case Study"
        >
          <span>Ask about using the space for your next venue or event!</span>
        </SectionHeading>

        <div className="mt-4">
          <div className="px-4 py-1 bg-teal-600 md:py-2">Today</div>
          {todayEvents.length > 0 ? (
            todayEvents.map((event, index) => {
              const [day, month] = formatTupleDate(new Date(event.date));

              return (
                <div
                  key={index}
                  className="flex items-center justify-between px-2 py-2 md:px-4 hover:bg-white/[2%]"
                >
                  <div>
                    <h4 className="font-semibold text-md">{event.title}</h4>
                    <p className="text-sm text-orange-400">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center h-full gap-2 text-center md:flex-col md:gap-0 align-center">
                    <p className="text-xl font-semibold">{day}</p>
                    <p className="text-lg">{month}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="p-4 hover:bg-white/[2%]">No Events Today</p>
          )}

          <div className="px-4 py-1 bg-gray-600 md:py-2">Future Events</div>
          <div className="divide-y-2">
            {futureEvents.length > 0 ? (
              futureEvents.map((event, index) => {
                const [day, month] = formatTupleDate(new Date(event.date));

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between px-2 py-2 md:px-4 hover:bg-white/[2%]"
                  >
                    <div>
                      <h4 className="font-semibold text-md">{event.title}</h4>
                      <p className="text-sm text-orange-400">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-center h-full gap-2 text-center md:flex-col md:gap-0 align-center">
                      <p className="text-xl font-semibold">{day}</p>
                      <p className="text-lg">{month}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="p-4 hover:bg-white/[2%]">No Future Events</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
