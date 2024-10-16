import "server-only";
import { db } from "@/lib/prisma";
import { Product } from "@prisma/client";

export const getProducts = async (): Promise<Product[]> => {
  return await db.product.findMany({});
};
