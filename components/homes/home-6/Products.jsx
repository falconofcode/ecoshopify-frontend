"use client";
import { ProductCard } from "@/components/shopCards/ProductCard";

import { products1 } from "@/data/products";
import React, { useEffect, useState } from "react";

export default function Products({ tabLabels = {} }) {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [allproducts, setAllproducts] = useState([...products1]);

  const handleLoad = () => {
    setLoading(true);

    setTimeout(() => {
      setAllproducts((pre) => [...pre, ...products1.slice(0, 12)]);
      setLoading(false);
      setLoaded(true);
    }, 1000);
  };
  const tabs = [
    { key: "Best seller", label: tabLabels.bestSeller || "Best seller" },
    { key: "New arrivals", label: tabLabels.newArrivals || "New arrivals" },
    { key: "On Sale", label: tabLabels.onSale || "On Sale" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [filtered, setFiltered] = useState(allproducts);
  useEffect(() => {
    setFiltered(
      [...allproducts].filter((el) => el.filterCategories.includes(activeTab))
    );
  }, [activeTab, allproducts]);

  return (
    <section className="flat-spacing-17">
      <div className="container">
        <div className="flat-animate-tab">
          <ul className="widget-tab-3 d-flex justify-content-center wow fadeInUp">
            {tabs.map((tab, index) => (
              <li
                onClick={() => setActiveTab(tab.key)}
                className="nav-tab-item"
                role="presentation"
                key={tab.key}
              >
                <a className={activeTab === tab.key ? "active" : ""}>
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            <div className="tab-pane active show">
              <div className="grid-layout " data-grid="grid-4">
                {filtered.map((product, i) => (
                  <ProductCard product={product} key={i} />
                ))}
              </div>
              {!loaded && (
                <div className="tf-pagination-wrap view-more-button text-center">
                  <button
                    className={`tf-btn-loading tf-loading-default style-2 btn-loadmore ${
                      loading ? "loading" : ""
                    } `}
                    onClick={() => handleLoad()}
                  >
                    <span className="text">Load more</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
