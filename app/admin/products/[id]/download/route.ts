import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { notFound } from "next/navigation";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const data = await db.product.findUnique({
    where: { id },
    select: { filePath: true, name: true },
  });

  if (data == null) return notFound();

  const { size } = await fs.stat(data?.filePath);
  const file = await fs.readFile(data?.filePath);
  const extansion = data?.filePath.split(".").pop();

  return new NextResponse(file, {
    headers: {
      "Content-Disposition": ` attachement; filename="${data?.name}.${extansion}"`,
      "Content-Length": size.toString(),
    },
  });
}
