import db from "@/db/db";
import React from "react";
import { Product } from "../generated/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function getMostPopularProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
}

function getNewProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}
const HomePage = () => {
  return (
    <div className=" space-y-12">
      <ProductGridSection
        title={"Most Popular"}
        productFatcher={getMostPopularProducts}
      />
      <ProductGridSection title="Newest" productFatcher={getNewProducts} />
    </div>
  );
};

type ProductGridSectionProps = {
  title: string;
  productFatcher: () => Promise<Product[]>;
};

export function ProductGridSection({
  productFatcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex gap-4">
        <h2 className="font-bold text-3xl">{title}</h2>
        <Button variant={"outline"} asChild>
          <Link href={"/products"} className="space-x-2">
            <span>View all</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCard />
      </div>
    </div>
  );
}

export default HomePage;
