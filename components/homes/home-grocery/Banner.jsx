import Image from "next/image";
import Link from "next/link";
import React from "react";
import { groceryDemoImage } from "@/data/groceryDemoAssets";

export default function Banner() {
  const bannerImages = [
    groceryDemoImage("/images/collections/img-w-text-grocery1.jpg"),
    groceryDemoImage("/images/collections/img-w-text-grocery2.jpg"),
    groceryDemoImage("/images/collections/img-w-text-grocery3.jpg"),
  ];

  return (
    <section className="flat-spacing-12">
      <div className="container">
        <div className="tf-grid-layout md-col-2 tf-img-with-text img-text-3 img-text-3-style-2">
          <div className="tf-image wow fadeInUp" data-wow-delay="0s">
            <div className="grid-img-group">
              <div className="box-img item-1 hover-img tf-image-wrap">
                <div className="img-style">
                  <Image
                    className="lazyload"
                    data-src={bannerImages[0]}
                    alt="img-slider"
                    src={bannerImages[0]}
                    width={470}
                    height={420}
                  />
                </div>
              </div>
              <div className="box-img item-2 hover-img tf-image-wrap">
                <div className="img-style">
                  <Image
                    className="lazyload"
                    data-src={bannerImages[1]}
                    alt="img-slider"
                    src={bannerImages[1]}
                    width={600}
                    height={713}
                  />
                </div>
              </div>
              <div className="box-img item-3 hover-img tf-image-wrap">
                <div className="img-style">
                  <Image
                    className="lazyload"
                    data-src={bannerImages[2]}
                    alt="img-slider"
                    src={bannerImages[2]}
                    width={706}
                    height={628}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="tf-content-wrap wow fadeInUp" data-wow-delay="0s">
            <p
              className="subheading text-uppercase fw-7"
              style={{ color: "#253d4e" }}
            >
              PERFECT GIFT FOR YOU
            </p>
            <h2 className="heading fade-item fade-item-1 fw-6">
              Ecomus Subscription
            </h2>
            <p className="desc fade-item fade-item-2">
              Delivered every month! Perfect for your favorite vegan or anyone
              you want <br />
              to introduce to the best better-for-you foods out there.
            </p>
            <Link
              href={`/shop-default`}
              className="tf-btn btn-fill animate-hover-btn btn-icon radius-60"
            >
              <span>Shop collection</span>
              <i className="icon icon-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
