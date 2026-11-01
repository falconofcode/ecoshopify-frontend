"use client";

import { useState } from "react";
import { useStorefrontLanguage } from "@/components/homes/ecoshop/useStorefrontLanguage";

const labels = {
  en: {
    tabs: ["Description", "Additional information", "Shipping", "Return policies"],
    features: "Features",
    shippingTitle: "Shipping information",
    returnTitle: "Return policy",
  },
  ar: {
    tabs: ["الوصف", "معلومات إضافية", "الشحن", "سياسة الإرجاع"],
    features: "المميزات",
    shippingTitle: "معلومات الشحن",
    returnTitle: "سياسة الإرجاع",
  },
};

export default function SellzyDetailsTabs({ product }) {
  const lang = useStorefrontLanguage();
  const text = labels[lang];
  const [currentTab, setCurrentTab] = useState(0);
  const { shipping } = product;

  const shippingText =
    lang === "ar"
      ? `يصل طلبك خلال ${shipping.localDays} أيام داخل البلد وخلال ${shipping.internationalDays} يوماً للشحن الدولي.`
      : `Your order arrives in ${shipping.localDays} days locally and ${shipping.internationalDays} days for international shipping.`;
  const returnText =
    lang === "ar"
      ? `يمكنك إرجاع المنتج خلال ${shipping.returnDays} يوماً من تاريخ الشراء بشرط أن يكون بحالته الأصلية وغير مستخدم.`
      : `You can return this product within ${shipping.returnDays} days of purchase if it is unused and in its original packaging.`;

  return (
    <section
      className="flat-spacing-17 pt_0"
      style={{ maxWidth: "100vw", overflow: "clip" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="widget-tabs style-has-border">
              <ul className="widget-menu-tab">
                {text.tabs.map((title, i) => (
                  <li
                    key={title}
                    onClick={() => setCurrentTab(i)}
                    className={`item-title ${currentTab === i ? "active" : ""}`}
                  >
                    <span className="inner">{title}</span>
                  </li>
                ))}
              </ul>
              <div className="widget-content-tab">
                <div
                  className={`widget-content-inner ${
                    currentTab === 0 ? "active" : ""
                  }`}
                >
                  <p className="mb_30">{product.description?.[lang]}</p>
                  <h3 className="fs-16 fw-5">{text.features}</h3>
                  <ul className="mb-0">
                    {product.features.map((feature) => (
                      <li key={feature.en}>{feature[lang]}</li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`widget-content-inner ${
                    currentTab === 1 ? "active" : ""
                  }`}
                >
                  <table className="tf-pr-attrs">
                    <tbody>
                      {product.specifications.map((row) => (
                        <tr key={row.label.en}>
                          <th className="tf-attr-label">{row.label[lang]}</th>
                          <td className="tf-attr-value">
                            <p>{row.value[lang]}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  className={`widget-content-inner ${
                    currentTab === 2 ? "active" : ""
                  }`}
                >
                  <h3 className="fs-16 fw-5">{text.shippingTitle}</h3>
                  <p>{shippingText}</p>
                </div>
                <div
                  className={`widget-content-inner ${
                    currentTab === 3 ? "active" : ""
                  }`}
                >
                  <h3 className="fs-16 fw-5">{text.returnTitle}</h3>
                  <p>{returnText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
