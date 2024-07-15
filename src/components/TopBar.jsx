"use client";

import { formatPhoneNumber } from "@/lib/utils";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const TopBar = () => {
  const [isClient, setIsClient] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-[#0c0b09] h-[40px] backdrop-blur-lg w-full">
      <div className="container flex justify-between h-full py-2 text-sm">
        <p className="flex items-center h-full gap-4">
          <Phone className="w-4 h-4 text-orange-400" />
          {isClient && formatPhoneNumber("4805904270")}
        </p>

        <div className="flex items-center py-1 text-right">
          {session ? (
            <>
              <Link href="/profile" className="px-2 hover:text-orange-400">
                Profile
              </Link>
              <Button
                variant="link"
                onClick={(e) => signOut()}
                className="px-2 hover:text-orange-400"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="link"
              onClick={(e) => signIn("google")}
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
