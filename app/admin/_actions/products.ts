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

export async function addProduct(prevState: unknown, formData: FormData) {
  const data = {
    name: formData.get("name"),
    priceInCents: formData.get("priceInCents"),
    description: formData.get("description"),
    file: formData.get("file") as File,
    image: formData.get("image") as File,
  };

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const result = addSchema.safeParse(data);
  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    console.log("Zod errors:", fieldErrors);
    return fieldErrors;
  }

  const validData = result.data;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${validData.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await validData.file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${validData.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await validData.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      name: validData.name,
      description: validData.description,
      priceInCents: validData.priceInCents,
      filePath,
      imagePath,
    },
  });

  redirect("/admin/product");
}
