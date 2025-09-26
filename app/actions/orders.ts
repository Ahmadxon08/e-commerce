"use server";

import db from "@/db/db";

export async function userOrderExits(
  email: string | undefined,
  productId: string
) {
  return (
    (await db.order.findFirst({
      where: { user: { email }, productId },
      select: { id: true },
    })) !== null
  );
}
