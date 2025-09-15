import React from "react";
import { PageHeader } from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableHead, TableRow } from "@/components/ui/table";

const ProductsPage = () => {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>{`Products`}</PageHeader>
        <Button asChild>
          <Link href="/admin/product/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
};

export default ProductsPage;

function ProductsTable() {
  return (
    <>
      <Table>
        <thead>
          <TableRow>
            <TableHead className="w-0">
              <span className="sr-only"> Awaiable only for Purchase</span>
            </TableHead>
            <TableHead>Names</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Prices</TableHead>
            <TableHead className="w-0">
              <span className="sr-only"> Actions</span>
            </TableHead>
          </TableRow>
        </thead>
      </Table>
    </>
  );
}
