"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { Product } from "@prisma/client";
import { CopyIcon, EditIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import { deleteProduct } from "@/app/(actions)/delete-product";
import { toast } from "react-toastify";

interface Props {
  product: Product;
}

export function MenuActionsProduct({ product }: Props) {
  const onDelete = async () => {
    try {
      await deleteProduct({ id: product.id });
      toast("Produto deletado com sucesso!", { type: "success" });
    } catch {
      toast("Erro ao deletar produto!", { type: "error" });
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal opacity={0.6} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <CopyIcon /> Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <EditIcon /> Editar
          </DropdownMenuItem>
          <AlertDialogTrigger className="w-full">
            <DropdownMenuItem className="cursor-pointer">
              <TrashIcon /> Excluir
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja apagar esse produto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar, a ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
