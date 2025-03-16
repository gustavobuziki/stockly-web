import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MenuActionsProduct } from "@/components/menu-actions-product";
import { Badge } from "@/components/ui/badge";
import { Product } from "@prisma/client";

interface Props {
  products: Product[];
}

export function TableProducts({ products }: Props) {
  return (
    <div className="bg-white p-3 rounded-sm">
      <Table className="bg-white">
        <TableCaption>Lista dos atuais produtos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead accessKey="name">Produtos</TableHead>
            <TableHead accessKey="price">Valor unitário</TableHead>
            <TableHead accessKey="stock">Estoque</TableHead>
            <TableHead accessKey="status">Status</TableHead>
            <TableHead accessKey="actions">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(product.price))}
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                {product.status === "IN_STOCK" ? (
                  <Badge className="text-primary" variant="secondary">
                    <div className="w-2 h-2 bg-primary rounded-full mx-2" />
                    <span className="w-20">Em estoque</span>
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-gray-600 bg-gray-100"
                  >
                    <div className="w-2 h-2 bg-gray-600 rounded-full mx-2" />
                    <span className="w-20">Esgotado</span>
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <MenuActionsProduct product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
