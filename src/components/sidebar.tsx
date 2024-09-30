import { SidebarItem } from "./sidebar-item";
import { LayoutGrid, Package, ShoppingBasket } from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex w-72 flex-col bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-black">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarItem href="/dashboard">
          <LayoutGrid size={20} />
          <p className="text-sm font-semibold">Dashboard</p>
        </SidebarItem>
        <SidebarItem href="/products">
          <Package size={20} />
          <p className="text-sm font-semibold">Products</p>
        </SidebarItem>
        <SidebarItem href="/sales">
          <ShoppingBasket size={20} />
          <p className="text-sm font-semibold">Sales</p>
        </SidebarItem>
      </div>
    </div>
  );
}
