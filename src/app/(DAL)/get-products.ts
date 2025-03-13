import "server-only";

import { db } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { unstable_cache } from "next/cache";

const getProducts = async (): Promise<Product[]> => {
  return db.product.findMany();
};

export const cachedGetProducts = unstable_cache(getProducts, ["getProducts"], {
  tags: ["get-products"],
});
