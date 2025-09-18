"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/db/formatter";
import { useActionState, useState } from "react";
import { addProduct } from "../../_actions/products";
import { useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

const ProductForm = ({ product }: { product?: Product | null }) => {
  const [error, action] = useActionState(addProduct, {});
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );

  return (
    <div>
      <form action={action} className="space-y-8">
        <div className=" space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="Product Name"
            id="name"
            name="name"
            required
            defaultValue={product?.name || ""}
          />
        </div>
        {error.name && <p className="text-sm text-red-600">{error.name}</p>}

        <div className="space-y-2">
          <Label htmlFor="priceInCents">Price in Cents</Label>
          <Input
            type="number"
            placeholder="Price in Cents"
            id="priceInCents"
            name="priceInCents"
            required
            defaultValue={product?.priceInCents || ""}
            value={priceInCents}
            onChange={(e) => setPriceInCents(Number(e.target.value) || 0)}
          />
          <div className="text-muted-foreground">
            {formatCurrency((priceInCents || 0) / 100)}
          </div>
        </div>
        {error.priceInCents && (
          <p className="text-sm text-red-600">{error.priceInCents}</p>
        )}

        <div className=" space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="description"
            name="description"
            id="description"
            required
            defaultValue={product?.description || ""}
          />
        </div>
        {error.description && (
          <p className="text-sm text-red-600">{error.description}</p>
        )}

        <div className=" space-y-2">
          <Label htmlFor="file">File</Label>
          <Input
            type="file"
            placeholder="file"
            name="file"
            id="file"
            required={product === null}
          />
        </div>

        {product !== null && (
          <p className="text-sm text-muted-foreground">{product?.filePath}.</p>
        )}
        {error.file && <p className="text-sm text-red-600">{error.file}</p>}
        <div className=" space-y-2">
          <Label htmlFor="image">File</Label>
          <Input
            type="file"
            placeholder="image"
            id="image"
            name="image"
            required={product === null}
          />
        </div>
        {product !== null && (
          <Image
            src={product.imagePath} // now guaranteed string
            alt="product image "
            width={200}
            height={200}
          />
        )}
        {error.image && <p className="text-sm text-red-600">{error.image}</p>}
        <SubmitButton />
      </form>
    </div>
  );
};

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
};

export default ProductForm;
