"use server";

import db from "@/db/db";
import z from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";

// const ProductFormSchema = z.instanceof(File, {
//   message: "Please upload a file.",
// });

// const ImageSchema = ProductFormSchema.refine(
//   (file) => file.type.startsWith("image/"),
//   {
//     message: "Uploaded file must be an image.",
//   }
// );

const addSchema = z.object({
  name: z.string().min(1),
  priceInCents: z.coerce
    .number({
      message: "Price is required.",
    })
    .int("Price must be an integer.")
    .min(0, { message: "Price cannot be less than 0." }),
  description: z.string().min(1),
  file: z
    .instanceof(File, { message: "Please upload a file." })
    .refine((file) => file.size > 0, {
      message: "File size must be greater than 0 bytes.",
    }),
  image: z
    .instanceof(File, { message: "Please upload an image." })
    .refine((file) => file.size > 0, {
      message: "File size must be greater than 0 bytes.",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Uploaded file must be an image.",
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
      isAvailableForPurchase: false,
      name: validData.name,
      description: validData.description,
      priceInCents: validData.priceInCents,
      filePath,
      imagePath,
    },
  });

  redirect("/admin/product");
}

const editSchema = addSchema.extend({
  file: addSchema.shape.file.optional(),
  image: addSchema.shape.image.optional(),
});
export async function updatedProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
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

  const result = editSchema.safeParse(data);
  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    console.log("Zod errors:", fieldErrors);
    return fieldErrors;
  }

  const validData = result.data;

  const product = await db.product.findUnique({ where: { id } });

  if (product === null) return notFound();

  if (validData.file !== null && validData.file.size > 0) {
    await fs.unlink(product.filePath);
    const filePath = `products/${crypto.randomUUID()}-${validData.file.name}`;
    await fs.writeFile(
      filePath,
      Buffer.from(await validData.file.arrayBuffer())
    );
  }
  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${validData.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await validData.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: validData.name,
      description: validData.description,
      priceInCents: validData.priceInCents,
      filePath,
      imagePath,
    },
  });

  redirect("/admin/product");
}
export async function toggleIsAvailableForPurchase(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });

  if (product === null) {
    return notFound();
  }

  await fs.unlink(product.filePath);
  await fs.unlink(`public${product.imagePath}`);
}
