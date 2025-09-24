import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatCurrency } from "@/db/formatter";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type ProductProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string | null;
  imagePath: string;
};

const ProductCard = async ({
  name,
  id,
  priceInCents,
  description,
  imagePath,
}: ProductProps) => {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" size={"lg"}>
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export function SkeletonGray() {
  return (
    <Card className="flex overflow-hidden flex-col pt-0 animate-pulse">
      <div className=" w-full  bg-gray-300 aspect-video" />
      <CardHeader>
        <CardTitle>
          {" "}
          <div className=" w-3/4 h-6 rounded-full  bg-gray-300 aspect-video" />
        </CardTitle>
        <CardDescription>
          {" "}
          <div className=" w-1/2 h-4 rounded-full  bg-gray-300 aspect-video" />
        </CardDescription>
      </CardHeader>

      <CardContent className=" space-y-2">
        <div className=" w-full  h-4 rounded-full  bg-gray-300 " />
        <div className=" w-full  h-4 rounded-full  bg-gray-300 " />
        <div className=" w-3/4  h-4 rounded-full  bg-gray-300 " />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size={"lg"}></Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
