"use server";

import db from "@/db/db";
import z from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";

const ProductFormSchema = z.instanceof(File, {
  message: "Please upload a file.",
});

const ImageSchema = ProductFormSchema.refine(
  (file) => file.type.startsWith("image/"),
  {
    message: "Uploaded file must be an image.",
  }
);

const addSchema = z.object({
  name: z.string().min(1),
  priceInCents: z.coerce.number().int().min(0),
  description: z.string().min(1),
  file: ProductFormSchema.refine((file) => file.size > 0, {
    message: "File size must be greater than 0 bytes.",
  }),
  image: ImageSchema.refine((file) => file.size > 0, {
    message: "File size must be greater than 0 bytes.",
  }),
});

export async function addProduct(formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    return fieldErrors;
  }
  const data = result.data;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.Product.create({
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  redirect("/admin/products");
}
