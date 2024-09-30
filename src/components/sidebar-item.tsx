"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

interface SidebarItemProps {
  href: string;
  children: ReactNode;
}

export function SidebarItem({ children, href }: SidebarItemProps) {
  const pathname = usePathname();

  return (
    <Button
      variant={pathname === href ? "secondary" : "ghost"}
      className="w-full justify-start gap-2"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
