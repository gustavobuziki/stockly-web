"use server";

import { db } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

interface Props {
  data: {
    name: string;
    price: number;
    stock: number;
  };
}

export const createProduct = async ({ data }: Props) => {
  await db.product.create({ data });

  revalidateTag("get-products");
};
