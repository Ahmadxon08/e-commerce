import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/db/formatter";
import React from "react";

async function getSalesData() {
  const data = await db.order?.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data?._sum?.pricePaidInCents || 0) / 100,
    numberOfSales: data?._count,
  };
}

async function getUsersData() {
  const [userCount, orderCount] = await Promise.all([
    db.user?.count(),
    db.order?.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);
  return {
    userCount,
    avarageValuePerUser:
      userCount === 0
        ? 0
        : (orderCount?._sum?.pricePaidInCents || 0) / userCount / 100,
  };
}

async function getProductsData() {
  const [activeCount, inActiveCount] = await Promise.all([
    db.product?.count({ where: { isAvailableForPurchase: true } }),
    db.product?.count({ where: { isAvailableForPurchase: false } }),
  ]);
  return { activeCount, inActiveCount };
}

const AdminPage = async () => {
  const [userData, getData, productData] = await Promise.all([
    getUsersData(),
    getSalesData(),
    getProductsData(),
  ]);

  return (
    <div className="grid  px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        desc={`${formatNumber(getData.numberOfSales)} Orders`}
        body={formatCurrency(getData.amount)}
      />
      <DashboardCard
        title="Costumers"
        desc={`${formatNumber(userData.avarageValuePerUser)} `}
        body={formatCurrency(userData.userCount)}
      />
      <DashboardCard
        title="Costumers"
        desc={`${formatNumber(productData.inActiveCount)} `}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
};

type DashboardCardProps = {
  title: string;
  desc: string;
  body: string | number;
};

export function DashboardCard({ title, desc, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{body}</p>
      </CardContent>
    </Card>
  );
}
export default AdminPage;
