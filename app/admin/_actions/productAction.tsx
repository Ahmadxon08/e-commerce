"use client";

import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteProduct, toggleIsAvailableForPurchase } from "./products";
import { useRouter } from "next/navigation";

export function ActiveToggleDropdown({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const rounter = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleIsAvailableForPurchase(id, !isAvailableForPurchase);
          rounter.refresh();
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

  const rounter = useRouter();

  return (
    <DropdownMenuItem
      className="text-red-600 hover:bg-red-70"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          rounter.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
