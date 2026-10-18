import Footer1 from "@/components/footers/Footer1";
import HeaderStorefront from "@/components/headers/HeaderStorefront";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import Orders from "@/components/othersPages/dashboard/Orders";
import React from "react";

export const metadata = {
  title: "My Account Orders || Ecoshopify - Ultimate Nextjs Ecommerce Template",
  description: "Ecoshopify - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <HeaderStorefront />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Orders</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <Orders />
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </>
  );
}
