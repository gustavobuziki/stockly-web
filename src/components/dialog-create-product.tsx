"use client";

import { z } from "zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumericFormat } from "react-number-format";

import { TAddProduct } from "@/types/product";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { createProduct } from "@/app/(actions)/create-product";
import { useState } from "react";

const schema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório!" }),
  price: z.number().min(0.01, { message: "O valor é obrigatório!" }),
  stock: z.coerce
    .number()
    .positive({ message: "A quantidade em estoque deve ser positiva." })
    .int()
    .min(0, { message: "O estoque é obrigatório!" }),
});

export function DialogCreateProduct() {
  const form = useForm<TAddProduct>({
    shouldUnregister: true,
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
  });

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const onSubmit = async (data: TAddProduct) => {
    try {
      await createProduct(data);
      setDialogIsOpen(false);
    } catch (e) {
      return e;
    }
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus />
          Novo produto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[410] w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <DialogHeader>
              <DialogTitle>Cadastrar produto</DialogTitle>
              <DialogDescription>
                Insira as informações abaixo
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do produto</FormLabel>
                  <FormControl>
                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      fixedDecimalScale
                      decimalScale={2}
                      prefix="R$"
                      allowNegative={false}
                      customInput={Input}
                      onValueChange={(value) => {
                        field.onChange(value.floatValue);
                      }}
                      {...field}
                      onChange={() => {}}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque do produto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Digite o estoque do produto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end pt-4">
              <DialogClose asChild>
                <Button className="w-32" type="reset" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                className="w-32"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
