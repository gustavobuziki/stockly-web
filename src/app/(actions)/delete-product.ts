"use server";

import { db } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export const deleteProduct = async ({ id }: { id: string }) => {
  await db.product.delete({
    where: {
      id,
    },
  });

  revalidateTag("get-products");
};
