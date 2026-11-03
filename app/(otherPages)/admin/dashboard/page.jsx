import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import RoleGuard from "@/components/othersPages/RoleGuard";
import AdminDashboard from "@/components/othersPages/AdminDashboard";
import React from "react";

export const metadata = {
  title: "Admin Dashboard || Ecoshopify",
};
export default function page() {
  return (
    <>
      <Header2 />
      <RoleGuard role="ADMIN" loginPath="/admin/login">
        <AdminDashboard />
      </RoleGuard>
      <Footer1 />
    </>
  );
}
