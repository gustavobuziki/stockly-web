"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumericFormat } from "react-number-format";
import { createProduct } from "@/app/(actions)/create-product";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  price: z.number().min(0.01, { message: "Preço é obrigatório" }),
  stock: z.coerce
    .number()
    .positive({ message: "A quantidade em estoque deve ser positivo" })
    .int()
    .min(0, { message: "Quantidade é obrigatório" }),
});

type FormSchema = z.infer<typeof schema>;

const customToastStyle = {
  background: "#01a082",
  color: "#fff",
};

export function DialogAddProduct() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingCreateProduct, setIsLoadingCreateProduct] = useState(false);

  const onSubmit = async (data: FormSchema) => {
    setIsLoadingCreateProduct(true);

    try {
      await createProduct({ data });
      form.reset();
      setIsOpen(false);
      toast("Produto criado com sucesso!", {
        type: "success",
        style: customToastStyle,
      });
    } catch {
      toast("Erro ao criar produto!", { type: "error" });
    } finally {
      setIsLoadingCreateProduct(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon /> Novo produto
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[325px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Cadastrar produto</DialogTitle>
              <DialogDescription>
                Insira as informações abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do produto:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome."
                        {...field}
                        autoFocus
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
                {isLoadingCreateProduct && (
                  <LoaderCircleIcon className="animate-spin" />
                )}
                Criar produto
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
