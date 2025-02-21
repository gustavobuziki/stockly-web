"use server";

import { db } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

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
  revalidateTag("get-products");
};
