"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
import { ContentAddOrEditProduct } from "./content-add-or-edit-product";
import { useState } from "react";

interface Props {
  product: Product;
}

export function MenuActionsProduct({ product }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    try {
      await deleteProduct({ id: product.id });
      toast("Produto deletado com sucesso!", { type: "success" });
    } catch {
      toast("Erro ao deletar produto!", { type: "error" });
    }
  };

  const onCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal opacity={0.6} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              <CopyIcon /> Copiar ID
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <EditIcon /> Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger className="w-full">
              <DropdownMenuItem className="cursor-pointer">
                <TrashIcon /> Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <ContentAddOrEditProduct
          onClose={onCloseDialog}
          open={isOpen}
          defaultValues={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
          }}
        />
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
            <AlertDialogAction onClick={onDelete} autoFocus>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
