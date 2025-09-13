import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

function getSalesData() {}

const AdminPage = () => {
  return (
    <div className="grid  px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Total Revenue"
        desc="Total revenue generated"
        price="2222$"
      />
    </div>
  );
};

type DashboardCardProps = {
  title: string;
  desc: string;
  price: string;
};

export function DashboardCard({ title, desc, price }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{price}</p>
      </CardContent>
    </Card>
  );
}
export default AdminPage;
