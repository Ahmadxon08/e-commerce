import z from "zod";

const ProductFormSchema = z.instanceof(File, {
  message: "Please upload a file.",
});

z.object({
  name: z.string().min(1),
  priceInCents: z.coerce.number().int().min(0),
  description: z.string().min(1),
  file: ProductFormSchema.refine((file) => file.size > 0, {
    message: "File size must be greater than 0 bytes.",
  }),
  image: ProductFormSchema.refine((file) => file.size > 0, {
    message: "File size must be greater than 0 bytes.",
  }),
});

export async function addProduct(formData: FormData) {
  console.log("formData", formData);
}
