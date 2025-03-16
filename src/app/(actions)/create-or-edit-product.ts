"use server";

import { db } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

interface Props {
  id?: string;
  data: {
    name: string;
    price: number;
    stock: number;
  };
}

export const createOrEditProduct = async ({ data, id }: Props) => {
  await db.product.upsert({
    where: {
      id: id || "",
    },
    update: data,
    create: data,
  });

  revalidateTag("get-products");
};
