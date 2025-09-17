import React from "react";
import { PageHeader } from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/db/formatter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActiveToggleDropdown,
  DeleteProductButton,
} from "../_actions/productAction";

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

async function ProductsTable() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  if (products.length === 0) {
    return <div>No products found.</div>;
  }
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
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.isAvailableForPurchase ? (
                  <>
                    <span className="sr-only">Availible</span>
                    <CheckCircle2 />
                  </>
                ) : (
                  <>
                    <span className="sr-only">Unavailible</span>

                    <XCircle />
                  </>
                )}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {formatCurrency(product.priceInCents / 100)}
              </TableCell>
              <TableCell>{formatNumber(product._count.orders)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <a
                        download
                        href={`/admin/products${product.id}/download`}
                      >
                        Download
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link download href={`/admin/products${product.id}/edit`}>
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <ActiveToggleDropdown
                      id={product.id}
                      isAvailableForPurchase={product.isAvailableForPurchase}
                    />
                    <DeleteProductButton
                      id={product.id}
                      disabled={product._count.orders > 0}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
