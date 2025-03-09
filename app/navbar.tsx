"use client";

import { useSidebarStore } from "@/store";
import { Avatar, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { GoBell } from "react-icons/go";
import { useState, useEffect } from "react";

// Navbar Component
export default function Navbar() {
  const { isVisible, setVisible } = useSidebarStore();
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);

  // Ensure this component is rendered on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setVisible();
  };

  return (
    <nav className="w-full h-[70px] flex items-center justify-between px-3 bg-primary">
      <Flex align="center" gap="6">
        {/* Sidebar Toggle Button */}
        <button
          onClick={handleSidebarToggle}
          className={`flex flex-col gap-[5px] cursor-pointer ${
            isVisible ? "toggler" : ""
          }`}
          aria-label="Toggle sidebar"
        >
          <span className="line-1 w-[25px] transition-all h-[2px] bg-gray-300"></span>
          <span className="line-2 w-[25px] transition-all h-[2px] bg-gray-300"></span>
          <span className="line-3 w-[25px] transition-all h-[2px] bg-gray-300"></span>
        </button>
      </Flex>

      <Flex align="center" gap="6">
        {/* Notification Bell Icon */}
        <GoBell className="text-gray-300 text-2xl" aria-label="Notifications" />

        {/* User Avatar */}
        {isClient && session?.user && (
          <Avatar
            src={session.user.image || ""}
            size="2"
            radius="full"
            fallback={session.user.name?.[0] || "U"}
            alt={session.user.name || "User"}
          />
        )}
      </Flex>
    </nav>
  );
}
