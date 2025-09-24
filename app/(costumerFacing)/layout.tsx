import React from "react";
import Nav, { NavLink } from "@/components/Nav";
type AdminLayoutProps = {
  children: React.ReactNode;
};

export const dynamic = "force-dynamic";

const HomeLayout = ({ children }: Readonly<AdminLayoutProps>) => {
  return (
    <>
      <Nav>
        <NavLink href="/">Dashboard</NavLink>
        <NavLink href="/product">Products</NavLink>
        <NavLink href="/orders">My orders</NavLink>
      </Nav>

      <div className="px-4 my-6">{children}</div>
    </>
  );
};

export default HomeLayout;
