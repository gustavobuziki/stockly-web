import { SidebarItem } from "./sidebar-item";
import { LayoutGrid, Package, ShoppingBasket } from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex w-72 flex-col bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-black text-greenPrimary">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarItem href="/dashboard">
          <LayoutGrid size={20} className="text-greenPrimary" />
          <p className="text-sm text-greenPrimary">Dashboard</p>
        </SidebarItem>
        <SidebarItem href="/produtos">
          <Package size={20} className="text-greenPrimary" />
          <p className="text-sm text-greenPrimary">Produtos</p>
        </SidebarItem>
        <SidebarItem href="/vendas">
          <ShoppingBasket size={20} className="text-greenPrimary" />
          <p className="text-sm text-greenPrimary">Vendas</p>
        </SidebarItem>
      </div>
    </div>
  );
}
