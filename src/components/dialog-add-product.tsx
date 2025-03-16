"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { ContentAddOrEditProduct } from "./content-add-or-edit-product";

export function DialogAddProduct() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon /> Novo produto
        </Button>
      </DialogTrigger>
      <ContentAddOrEditProduct onClose={onClose} open={isOpen} />
    </Dialog>
  );
}
