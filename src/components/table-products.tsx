"use client";

import { Product } from "@prisma/client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TableProductsData {
  data: Product[];
}

export function TableProducts({ data }: TableProductsData) {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Produto",
    },
    {
      accessorKey: "price",
      header: "Valor unitário",
    },
    {
      accessorKey: "stock",
      header: "Estoque",
    },
    {
      accessorKey: "status",
      header: "Status ",
      cell: (row) => {
        const product = row.row.original;

        if (product.status === "IN_STOCK") {
          return (
            <Badge
              variant="destructive"
              className="bg-greenPrimary opacity-100 hover:bg-greenPrimary hover:opacity-80"
            >
              Em estoque
            </Badge>
          );
        }
        if (product.status !== "IN_STOCK") {
          return <Badge variant="outline">Esgotado</Badge>;
        }
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
