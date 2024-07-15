"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import GoogleLoginButton from "../GoogleLoginButton";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const slideInVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.2,
      },
    }),
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-transform duration-200",
          isHidden ? "-translate-y-[40px]" : "translate-y-0"
        )}
      >
        <TopBar />
      </div>
      <div
        className={cn(
          "fixed top-[40px] left-0 right-0 z-40 p-4 backdrop-blur-lg bg-black/80 transition-transform duration-200",
          isHidden ? "-translate-y-[40px]  border-b" : "translate-y-0 "
        )}
      >
        <div className="container flex items-center justify-between">
          <span className="text-xl font-bold">Case Study Phoenix</span>
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative ml-4 aspect-square "
                >
                  <Menu className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-8 min-w-[400px] max-w-full"
              >
                <nav className="flex flex-col justify-between h-full ">
                  <div className="flex flex-col mt-16 space-y-4">
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                    >
                      <Link
                        href="/"
                        className="text-2xl hover:text-orange-400 font-[800] py-4"
                      >
                        Home
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                    >
                      <Link
                        href="/about"
                        className="text-2xl hover:text-orange-400 font-[800] py-4"
                      >
                        About
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={2}
                    >
                      <Link
                        href="/contact"
                        className="mb-auto text-2xl hover:text-orange-400 font-[800] py-4"
                      >
                        Contact
                      </Link>
                    </motion.div>
                  </div>
                  <div className="flex flex-col w-full gap-4">
                    <Button
                      className="border-orange-400 "
                      size="lg"
                      variant="outline"
                    >
                      Order Online
                    </Button>
                    <GoogleLoginButton />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden gap-2 md:flex">
            <Link href="/" className="p-2 hover:text-orange-400">
              Home
            </Link>
            <Link href="/about" className="p-2 hover:text-orange-400">
              About
            </Link>
            <Link href="/contact" className="p-2 hover:text-orange-400">
              Contact
            </Link>
            {!session?.user ? (
              <Button className="ml-4 border-orange-400" variant="outline">
                Order Online
              </Button>
            ) : (
              ""
            )}
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
