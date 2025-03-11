"use client";

import { useSidebarStore } from "@/store";
import { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { cn } from "@/lib/utils";

export default function SidebarProvider({ children }: PropsWithChildren) {
  const isVisible = useSidebarStore((s) => s.isVisible);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a fallback or null during server-side rendering
    return null;
  }

  return (
    <div
      className={`absolute h-dvh right-0 transition-all ${
        isVisible ? "left-0" : "left-[250px]"
      }`}
    >
      <Navbar />
      <Sidebar />
      <div className={cn(!isVisible && "w-[calc(100dvw-250px)]", "px-3")}>
        {children}
      </div>
    </div>
  );
}
