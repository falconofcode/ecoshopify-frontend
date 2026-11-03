import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Register from "@/components/othersPages/Register";
import React from "react";

export const metadata = {
  title: "Become a Seller || Ecoshopify",
};
export default function page() {
  return (
    <>
      <Header2 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Become a Seller</div>
        </div>
      </div>
      <Register variant="vendor" />
      <Footer1 />
    </>
  );
}
