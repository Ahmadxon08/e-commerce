"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

type CheckedFormProps = {
  product: {};
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);
const CheckedForm = ({ product, clientSecret }: CheckedFormProps) => {
  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <Form />
    </Elements>
  );
};

function Form() {
  const stripe = useStripe();
  const elements = useElements();

  return <PaymentElement />;
}

export default CheckedForm;
