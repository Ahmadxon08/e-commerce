"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductForm = () => {
  return (
    <div>
      <form className="space-y-8">
        <div className=" space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" placeholder="Product Name" id="name" required />
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
