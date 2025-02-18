"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface Props {
  name: string;
  stock: number;
  price: number;
}

export const createProduct = async ({ name, stock, price }: Props) => {
  await db.product.create({
    data: {
      name,
      stock,
      price,
    },
  });
  revalidatePath("/products");
};
