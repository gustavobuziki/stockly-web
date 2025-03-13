import { DialogAddProduct } from "@/components/dialog-add-product";
import { Header } from "@/components/header";
import { TableProducts } from "@/components/table-products";
import { cachedGetProducts } from "../(DAL)/get-products";

export default async function Produtos() {
  const products = await cachedGetProducts();

  return (
    <div className="space-y-6">
      <Header
        title="Produtos"
        subtitle="Gestão de produtos"
        action={<DialogAddProduct />}
      />
      <TableProducts products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}
