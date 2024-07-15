"use client";

import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Locate,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { formatPhoneNumber } from "../../../lib/utils";
import { useEffect, useState } from "react";
import Map from "@/components/map/Map";

const ContactItem = ({ icon: Icon, title, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState("");

  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    setCurrentDay(days[today]);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const formatHours = (value) => {
    return (
      <div>
        <div className="flex gap-4 cursor-pointer" onClick={toggleDropdown}>
          <span className="col-span-1">{currentDay}:</span>
          <span className="flex items-center justify-between col-span-2">
            {value[currentDay]}{" "}
            <span className="ml-2">
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </span>
          </span>
        </div>
        {isOpen && (
          <div>
            {Object.entries(value).map(([day, hours], index) =>
              day !== currentDay ? (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <span className="col-span-1">{day}:</span>
                  <span className="col-span-1">{hours}</span>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex gap-4">
      <div className="flex items-center justify-center w-12 h-12 bg-orange-400 rounded-full">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="text-lg font-bold">{title}:</h4>
        <div className="text-orange-400">
          {title === "Call" ? (
            <a href={`tel:${value}`} className="hover:underline">
              {formatPhoneNumber(value)}
            </a>
          ) : title === "Email" ? (
            <a href={`mailto:${value}`} className="hover:underline">
              {value}
            </a>
          ) : title === "Hours" ? (
            formatHours(value)
          ) : (
            value
          )}
        </div>
      </div>
    </div>
  );
};

const CONTACT_ITEMS = [
  {
    icon: Locate,
    title: "Location",
    value: "4802 N 16th st Phoenix, AZ",
  },
  {
    icon: Clock,
    title: "Hours",
    value: {
      Monday: "7AM - 1PM",
      Tuesday: "7AM - 1PM",
      Wednesday: "7AM - 1PM",
      Thursday: "7AM - 1PM",
      Friday: "7AM - 1PM",
      Saturday: "7AM - 1PM",
      Sunday: "7AM - 1PM",
    },
  },
  {
    icon: Mail,
    title: "Email",
    value: "william@casestudyphoenix.com",
  },
  {
    icon: Phone,
    title: "Call",
    value: "4805904270",
  },
];

const ContactSection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="bg-[#0c0b09]">
      <div className="md:py-16">
        <div className="container">
          <SectionHeading title="Contact" description="Get in touch with us" />
        </div>
        <div className="my-8 w-full md:h-[300px] overflow-hidden">
          {isClient && <Map />}
        </div>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col col-span-2 gap-6 my-8 md:col-span-1">
              {CONTACT_ITEMS.map((item, index) => (
                <ContactItem key={index} {...item} />
              ))}
            </div>
            <div className="h-full col-span-2">
              <form
                action="#"
                method="POST"
                className="flex flex-col justify-center h-full gap-6 my-8 md:my-0"
              >
                <div className="flex flex-col gap-4 md:flex-row">
                  <Input
                    type="text"
                    className="bg-transparent"
                    placeholder="Your Name"
                  />
                  <Input
                    type="email"
                    className="bg-transparent"
                    placeholder="Your Email"
                  />
                </div>
                <Input
                  type="text"
                  className="bg-transparent"
                  placeholder="Subject"
                />
                <Textarea className="bg-transparent" placeholder="Message" />
                <div className="flex justify-center col-span-2 mb-8 md:mb-0">
                  <Button className="bg-orange-400 text-orange-950 hover:bg-orange-500 hover:text-orange-900">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
