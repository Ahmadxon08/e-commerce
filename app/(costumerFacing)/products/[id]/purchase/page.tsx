import db from "@/db/db";
import { notFound } from "next/navigation";
import React from "react";
import { stripe } from "@/lib/stripe"; // shu yerda chaqirasiz
import CheckedForm from "./_components/CheckedForm";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PurchasePage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await db.product.findUnique({
    where: { id },
  });

  console.log("Stripe key", process.env.STRIPE_SECRET_KEY as string);
  if (product === null) return notFound();

  const paymentIntents = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "USD",
    metadata: { productId: product.id },
  });

  if (paymentIntents.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }

  return (
    <CheckedForm
      product={product}
      clientSecret={paymentIntents.client_secret}
    />
  );
};

export default PurchasePage;
