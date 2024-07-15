"use client";

import { formatPhoneNumber } from "@/lib/utils";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

const TopBar = () => {
  const [isClient, setIsClient] = useState(false);

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
        <p className="flex items-center h-full text-right">
          {/* Code: <span className="pl-2 text-orange-400">Sunny</span> */}
        </p>
      </div>
    </div>
  );
};

export default TopBar;
