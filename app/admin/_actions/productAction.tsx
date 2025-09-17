"use client";

import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteProduct, toggleIsAvailableForPurchase } from "./products";

export function ActiveToggleDropdown({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleIsAvailableForPurchase(id, !isAvailableForPurchase);
        });
      }}
    >
      {isAvailableForPurchase ? " Disactivate" : "Activate"}
    </DropdownMenuItem>
  );
}

export function DeleteProductButton({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      className="text-red-600"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
