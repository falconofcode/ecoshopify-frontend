import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import RoleGuard from "@/components/othersPages/RoleGuard";
import VendorDashboard from "@/components/othersPages/VendorDashboard";
import React from "react";

export const metadata = {
  title: "Seller Dashboard || Ecoshopify",
};
export default function page() {
  return (
    <>
      <Header2 />
      <RoleGuard role="VENDOR" loginPath="/login">
        <VendorDashboard />
      </RoleGuard>
      <Footer1 />
    </>
  );
}
