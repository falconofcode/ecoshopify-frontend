import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import HeaderStorefront from "@/components/headers/HeaderStorefront";

import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import Wishlist from "@/components/othersPages/dashboard/Wishlist";
import React from "react";

export const metadata = {
  title: "My Account Wishlist || Ecoshopify - Ultimate Nextjs Ecommerce Template",
  description: "Ecoshopify - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <HeaderStorefront />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Account Wishlist</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <Wishlist />
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </>
  );
}
