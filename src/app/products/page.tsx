import { DialogCreateProduct, TableProducts } from "@/components";
import { getProducts } from "../(DAL)/products/get-product";

export default async function Products() {
  const allProducts = await getProducts();

  return (
    <div className="p-8">
      <header className="flex items-center justify-between">
        <div className="w-full">
          <span className="text-xs font-semibold text-greenPrimary">
            Produtos
          </span>
          <h3 className="text-xl font-semibold text-slate-900">
            Gestão de produtos
          </h3>
        </div>
        <DialogCreateProduct />
      </header>
      <div className="radius my-4 rounded-sm p-2">
        <TableProducts data={JSON.parse(JSON.stringify(allProducts))} />
      </div>
    </div>
  );
}
