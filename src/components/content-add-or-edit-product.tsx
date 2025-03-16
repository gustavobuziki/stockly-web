"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumericFormat } from "react-number-format";
import { createOrEditProduct } from "@/app/(actions)/create-or-edit-product";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  price: z.number().min(0.01, { message: "Preço é obrigatório" }),
  stock: z.coerce
    .number()
    .positive({ message: "A quantidade em estoque deve ser positivo" })
    .int()
    .min(0, { message: "Quantidade é obrigatório" }),
});

type FormSchema = z.infer<typeof schema>;

interface Props {
  defaultValues?: FormSchema;
  onClose: () => void;
  open: boolean;
}

export function ContentAddOrEditProduct({
  defaultValues,
  onClose,
  open,
}: Props) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      name: "",
      price: 0,
      stock: 1,
    },
  });
  const isEditing = !!defaultValues;
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const onSubmit = async (data: FormSchema) => {
    setIsLoadingProduct(true);

    try {
      await createOrEditProduct({ data, id: defaultValues?.id });
      form.reset();
      onClose();
      toast(`Produto ${isEditing ? "editado" : "criado"} com sucesso!`, {
        type: "success",
      });
    } catch {
      toast(`Erro ao ${isEditing ? "editar" : "criar"} produto!`, {
        type: "error",
      });
    } finally {
      setIsLoadingProduct(false);
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  return (
    <DialogContent className="w-[325px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{`${
              !isEditing ? "Cadastrar" : "Editar"
            } produto`}</DialogTitle>
            <DialogDescription>Insira as informações abaixo.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto:</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome." {...field} autoFocus />
                  </FormControl>
                  <FormDescription>
                    {/* This is your public display name. */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor unitário</FormLabel>
                  <FormControl>
                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      fixedDecimalScale
                      decimalScale={2}
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue);
                      }}
                      {...field}
                      onChange={() => {}}
                    />
                  </FormControl>
                  <FormDescription>
                    {/* This is your public display name. */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Digite o estoque."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {/* This is your public display name. */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="w-full">
            <DialogClose asChild>
              <Button type="button" className="flex-1/2" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" className="flex-1/2">
              {isLoadingProduct && (
                <LoaderCircleIcon className="animate-spin" />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
