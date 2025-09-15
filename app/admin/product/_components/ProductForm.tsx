"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/db/formatter";
import { useState } from "react";
import { addProduct } from "../../_actions/products";

const ProductForm = () => {
  const [priceInCents, setPriceInCents] = useState<number>(0);
  return (
    <div>
      <form action={addProduct} className="space-y-8">
        <div className=" space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" placeholder="Product Name" id="name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priceInCents">Price in Cents</Label>
          <Input
            type="number"
            placeholder="Price in Cents"
            id="priceInCents"
            name="priceInCents"
            required
            value={priceInCents}
            onChange={(e) => setPriceInCents(Number(e.target.value) || 0)}
          />
          <div className="text-muted-foreground">
            {formatCurrency((priceInCents || 0) / 100)}
          </div>
        </div>
        <div className=" space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea placeholder="description" id="description" required />
        </div>
        <div className=" space-y-2">
          <Label htmlFor="file">File</Label>
          <Input type="file" placeholder="file" id="file" required />
        </div>
        <div className=" space-y-2">
          <Label htmlFor="image">File</Label>
          <Input type="file" placeholder="image" id="image" required />
        </div>

        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
};

export default ProductForm;
