import React from "react";
import Nav, { NavLink } from "@/components/Nav";
type AdminLayoutProps = {
  children: React.ReactNode;
};

export const dynamic = "force-dynamic";

const AdminLayout = ({ children }: Readonly<AdminLayoutProps>) => {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/product">Products</NavLink>
        <NavLink href="/admin/users">Costumers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>

      <div className="container my-6">{children}</div>
    </>
  );
};

export default AdminLayout;
