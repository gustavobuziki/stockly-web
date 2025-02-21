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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ClipboardCopyIcon, EditIcon, Ellipsis, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteProduct } from "@/app/(actions)/delete-product";
import { toast } from "@/hooks/use-toast";

interface TableProductsData {
  data: Product[];
}

export function TableProducts({ data }: TableProductsData) {
  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({
        variant: "default",
        description: "Produto deletado com sucesso!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Erro ao deletar produto!",
      });
      return error;
    }
  };

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
    {
      accessorKey: "actions",
      header: "Ações",
      cell: (row) => {
        const { id } = row.row.original;

        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Ellipsis opacity={0.5} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(id)}
                >
                  <ClipboardCopyIcon size={16} />
                  Copiar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <EditIcon size={16} />
                  Editar
                </DropdownMenuItem>
                <AlertDialogTrigger>
                  <DropdownMenuItem>
                    <TrashIcon size={16} />
                    Excluir
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deseja deletar o produto?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Deseja continuar?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Não</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteProduct(id)}>
                  Sim
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
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
