import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PopoverActionsProduct } from "@/components/popover-actions-product";

export function TableProducts() {
  return (
    <div className="bg-white p-3 rounded-sm ">
      <Table className="bg-white">
        <TableCaption>Lista dos atuais produtos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produtos</TableHead>
            <TableHead>Valor unitário</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell>
              <PopoverActionsProduct />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
