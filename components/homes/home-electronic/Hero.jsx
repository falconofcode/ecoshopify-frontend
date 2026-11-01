"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useStorefrontLanguage } from "@/components/homes/ecoshop/useStorefrontLanguage";

export default function Hero({ slides }) {
  const language = useStorefrontLanguage();

  return (
    <div className="tf-slideshow slider-home-2 slider-effect-fade position-relative">
      <Swiper
        dir="ltr"
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides={false}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1000}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true, el: ".spd160" }}
        className="tf-sw-slideshow"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="wrap-slider">
              <Image
                className="lazyload"
                data-src={slide.image.src}
                alt={slide.image.alt[language]}
                src={slide.image.src}
                width={slide.image.width}
                height={slide.image.height}
                priority
              />
              <div
                className="box-content"
                dir={language === "ar" ? "rtl" : "ltr"}
              >
                <div className="container">
                  <p className="fade-item fade-item-1">
                    {slide.eyebrow[language]}
                  </p>
                  <h1 className="fade-item fade-item-2">
                    {slide.heading[language].split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h1>
                  <Link
                    href={slide.button.href}
                    className="fade-item fade-item-3 rounded-full tf-btn btn-fill animate-hover-btn btn-xl radius-3"
                  >
                    <span>{slide.button.label[language]}</span>
                    <i className="icon icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination sw-absolute-2">
        <div className="container">
          <div className="sw-dots sw-pagination-slider justify-content-center spd160" />
        </div>
      </div>
    </div>
  );
}
