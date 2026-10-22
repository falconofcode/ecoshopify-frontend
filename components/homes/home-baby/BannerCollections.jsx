"use client";

import { collectionsRagada } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BannerCollections() {
  return (
    <section className="flat-spacing-20 pb_0">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-sw-collection"
          slidesPerView={3} // Equivalent to data-preview
          breakpoints={{
            1000: {
              slidesPerView: 3, // Equivalent to data-tablet
            },
            768: {
              slidesPerView: 2, // Equivalent to data-tablet
            },
            640: {
              slidesPerView: 2, // Equivalent to data-mobile
            },
            0: {
              slidesPerView: 1.2, // Equivalent to data-mobile
            },
          }}
          spaceBetween={30} // Equivalent to data-space-lg and data-space-md
          loop={false} // Equivalent to data-loop
          autoplay={false} // Equivalent to data-auto-play
        >
          {collectionsRagada.map((item) => (
            <SwiperSlide className="swiper-slide" key={item.id}>
              <div className="collection-item-v5 hover-img radius-10 o-hidden">
                <Link className="collection-inner" href={item.href}>
                  <div className="collection-image img-style">
                    <Image
                      className="lazyload"
                      data-src={item.imageSrc}
                      alt={item.altText}
                      src={item.imageSrc}
                      width={690}
                      height={840}
                    />
                  </div>
                  <div className="collection-content text-center">
                    <p
                      className="subheading text-dark wow fadeInUp"
                      data-wow-delay="0s"
                    >
                      {item.eyebrow}
                    </p>
                    <h5
                      className="heading text-dark fw-6 wow fadeInUp"
                      data-wow-delay="0s"
                    >
                      {item.title}
                    </h5>
                    <span className="tf-btn btn-line collection-other-link">
                      {item.linkText}
                      <i className="icon icon-arrow1-top-left" />
                    </span>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
