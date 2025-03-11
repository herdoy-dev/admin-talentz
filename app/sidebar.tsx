"use client";

import { useSidebarStore } from "@/store";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbReportAnalytics } from "react-icons/tb";

const items = [
  { id: 1, path: "/", label: "Dashboard", icon: <RxDashboard /> },
  { id: 2, path: "/messages", label: "Messages", icon: <LuMail /> },
  { id: 3, path: "/users", label: "Users", icon: <FaUserGroup /> },
  { id: 4, path: "/reports", label: "Reports", icon: <TbReportAnalytics /> },
];

export default function Sidebar() {
  const isVisible = useSidebarStore((s) => s.isVisible);
  const currentPath = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isVisible) return null; // Render nothing on the server or if sidebar is not visible

  return (
    <div className="h-dvh top-0 transition-all w-[250px] md:350px fixed left-0">
      <Link
        href="/"
        className="h-[70px] flex items-center bg-primary border-r px-2"
      >
        <Image src="/logo.png" width={120} height={40} alt="logo" />
      </Link>
      <div className="flex flex-col bg-[#E8E8E8] gap-2 py-4 border-r h-[calc(100dvh-70px)]">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`flex items-center gap-2 p-2 ${
              item.path === currentPath && "bg-[#AAEBCA4D] text-primary"
            }`}
          >
            {item.icon}
            <span> {item.label} </span>
          </Link>
        ))}
        <div
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 p-2 cursor-pointer"
        >
          <MdLogout />
          <span> Log Out </span>
        </div>
      </div>
    </div>
  );
}
