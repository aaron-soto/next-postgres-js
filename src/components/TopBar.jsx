"use client";

import { formatPhoneNumber } from "@/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

const TopBarItems = [
  {
    icon: Phone,
    content: () => (
      <a
        href="tel:4805904270"
        className="flex items-center gap-2 underline hover:text-orange-400"
      >
        {formatPhoneNumber("4805904270")}
      </a>
    ),
    text: formatPhoneNumber("4805904270"),
  },
  {
    icon: Mail,
    content: () => (
      <a
        href="mailto:william@casestudyphoenix.com"
        className="flex items-center gap-2 underline hover:text-orange-400"
      >
        william@casestudyphoenix.com
      </a>
    ),
    text: "william@casestudyphoenix.com",
  },
  {
    icon: MapPin,
    content: () => (
      <p className="flex items-center gap-2">4802 N 16th st Phoenix, AZ</p>
    ),
    text: "4802 N 16th st Phoenix, AZ",
  },
];

const TopBar = () => {
  const { data: session } = useSession();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const topBarItemsDuration = 5000;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isHovered) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % TopBarItems.length);
    }, topBarItemsDuration);

    return () => clearInterval(interval);
  }, [mounted, isHovered]);

  const CurrentIcon = TopBarItems[index].icon;

  return (
    <div className="bg-[#0c0b09] h-[40px] backdrop-blur-lg w-full">
      <div className="container flex justify-between h-full py-2 text-sm">
        <p className="flex items-center h-full gap-4 overflow-hidden">
          <AnimatePresence mode="wait">
            {mounted && (
              <motion.div
                key={TopBarItems[index].text}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                // transition={{ duration: 0.4 }} // default transition
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.3,
                }} // springy transition
                className="flex items-center gap-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <CurrentIcon className="w-4 h-4 text-orange-400" />
                {TopBarItems[index].content()}
              </motion.div>
            )}
          </AnimatePresence>
        </p>

        <div className="flex items-center py-1 text-right">
          {session ? (
            <>
              {(session.user.role === "ADMIN" ||
                session.user.role === "DEV") && (
                <Link href="/admin" className="px-2 hover:text-orange-400">
                  Admin
                </Link>
              )}
              <Link href="/profile" className="px-2 hover:text-orange-400">
                Profile
              </Link>
              <Button
                variant="link"
                onClick={() => signOut()}
                className="px-2 hover:text-orange-400"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="link"
              onClick={() => signIn("google")}
              className="px-2 hover:text-orange-400"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
