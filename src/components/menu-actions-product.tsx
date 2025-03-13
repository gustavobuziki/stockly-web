"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";

interface Props {
  product: Product;
}

export function MenuActionsProduct({ product }: Props) {
  const onEdit = () => {};

  const onDelete = () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal opacity={0.6} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuItem>Excluir</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
