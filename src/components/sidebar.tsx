import {
  LayoutDashboardIcon,
  Package2Icon,
  ShoppingBasketIcon,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export function Sidebar() {
  return (
    <aside className="min-w-[272px]">
      <h1 className="py-6 px-8 text-primary  font-black text-2xl">STOCKLY</h1>
      <ul className="flex flex-col gap-1">
        <SidebarItem pathname="/">
          <LayoutDashboardIcon size={18} />
          Dashboard
        </SidebarItem>
        <SidebarItem pathname="/produtos">
          <Package2Icon size={18} />
          Produtos
        </SidebarItem>
        <SidebarItem pathname="/vendas">
          <ShoppingBasketIcon size={18} />
          Vendas
        </SidebarItem>
      </ul>
    </aside>
  );
}
