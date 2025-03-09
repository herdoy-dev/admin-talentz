"use client";

import { useSidebarStore } from "@/store";
import { Grid } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function SidebarProvider({ children }: PropsWithChildren) {
  const isVisible = useSidebarStore((s) => s.isVisible);
  return (
    <div
      className={`absolute h-dvh right-0 transition-all ${
        isVisible ? "left-0" : "left-[250px]"
      }`}
    >
      <Navbar />
      <Grid columns={{ initial: "250px 1fr", md: "350px 1fr" }}>
        <Sidebar />
        {children}
      </Grid>
    </div>
  );
}
