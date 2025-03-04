import { DialogAddProduct } from "@/components/dialog-add-product";
import { Header } from "@/components/header";
import { TableProducts } from "@/components/table-products";

export default function Produtos() {
  return (
    <div className="space-y-6">
      <Header
        title="Produtos"
        subtitle="Gestão de produtos"
        action={<DialogAddProduct />}
      />
      <TableProducts />
    </div>
  );
}
