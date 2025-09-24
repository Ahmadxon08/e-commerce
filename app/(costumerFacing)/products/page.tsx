import ProductCard, { SkeletonGray } from "@/components/ProductCard";
import db from "@/db/db";
import React, { Suspense } from "react";

function getProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}

const ProductsPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <SkeletonGray />
            <SkeletonGray />
            <SkeletonGray />
            <SkeletonGray />
            <SkeletonGray />
          </>
        }
      >
        <ProductSuspense />
      </Suspense>
    </div>
  );
};
async function ProductSuspense() {
  const products = await getProducts();
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
export default ProductsPage;
