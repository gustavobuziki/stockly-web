"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  pathname: string;
  children: ReactNode;
}

export function SidebarItem({ children, pathname }: Props) {
  const currentPathname = usePathname();
  const styleLi = `flex items-center px-8 py-2 gap-2 ${
    pathname === currentPathname ? "text-primary" : "text-slate-500"
  } ${
    pathname === currentPathname ? "bg-secondary" : ""
  } mx-2 rounded-md cursor-pointer hover:bg-secondary hover:text-primary`;

  return (
    <Link href={pathname}>
      <li className={styleLi}>{children}</li>
    </Link>
  );
}
