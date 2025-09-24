import db from "@/db/db";
import React, { Suspense } from "react";
import { Product } from "../generated/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard, { SkeletonGray } from "@/components/ProductCard";

async function getMostPopularProducts() {
  await wait(1000);
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
}

async function getNewProducts() {
  await wait(2000);
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
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

export async function ProductGridSection({
  productFatcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <h2 className="font-bold text-3xl">{title}</h2>
        <Button variant={"outline"} asChild>
          <Link href={"/products"} className="space-x-2">
            <span>View all</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <SkeletonGray />
              <SkeletonGray />
              <SkeletonGray />
            </>
          }
        >
          <ProductSuspense productFatcher={productFatcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productFatcher,
}: {
  productFatcher: () => Promise<Product[]>;
}) {
  return (await productFatcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}

export default HomePage;
