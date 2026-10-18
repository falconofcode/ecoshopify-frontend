"use client";
import React, { useEffect, useRef, useState } from "react";
const languageOptions = [
  { id: "en", label: "English" },
  { id: "ar", label: "العربية" },
];

export default function LanguageSelect({
  parentClassName = "image-select center style-default type-languages",
  topStart = false,
}) {
  const [selected, setSelected] = useState(languageOptions[0]);
  const [isDDOpen, setIsDDOpen] = useState(false);
  const languageSelect = useRef();

  useEffect(() => {
    const direction = JSON.parse(
      window.localStorage.getItem("direction") || "null"
    )?.dir;
    setSelected(direction === "rtl" ? languageOptions[1] : languageOptions[0]);

    const handleClickOutside = (event) => {
      if (
        languageSelect.current &&
        !languageSelect.current.contains(event.target)
      ) {
        setIsDDOpen(false); // Close the dropdown if click is outside
      }
    };
    // Add the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const selectLanguage = (option) => {
    setSelected(option);
    setIsDDOpen(false);
    window.localStorage.setItem(
      "direction",
      JSON.stringify({ dir: option.id === "ar" ? "rtl" : "ltr" })
    );
    window.location.reload();
  };
  return (
    <>
      <div
        className={`dropdown bootstrap-select ${parentClassName} ${
          topStart ? "" : "dropup"
        }`}
        onClick={() => setIsDDOpen((pre) => !pre)}
        ref={languageSelect}
      >
        <select
          className="image-select center style-default type-languages"
          tabIndex="null"
        >
          {languageOptions.map((option, i) => (
            <option key={i} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          tabIndex={-1}
          className={`btn dropdown-toggle btn-light  ${
            isDDOpen ? "show" : ""
          } `}
        >
          <div className="filter-option">
            <div className="filter-option-inner">
              <div className="filter-option-inner-inner">{selected.label}</div>
            </div>
          </div>
        </button>
        <div
          className={`dropdown-menu ${isDDOpen ? "show" : ""} `}
          style={{
            position: "absolute",
            inset: topStart ? "100% auto auto 0px" : "auto auto 100% 0px",
            margin: 0,
            transform: `translate(0px, ${topStart ? 8 : -8}px)`,
          }}
          data-popper-placement={`${!topStart ? "top" : "bottom"}-start`}
        >
          <div
            className="inner show"
            style={{
              overflowY: "visible",
            }}
          >
            <ul
              className="dropdown-menu inner show"
              role="presentation"
              style={{ marginTop: 0, marginBottom: 0 }}
            >
              {languageOptions.map((elm, i) => (
                <li
                  key={i}
                  onClick={() => selectLanguage(elm)}
                  className={`selected ${selected == elm ? "active" : ""}`}
                >
                  <a
                    className={`dropdown-item ${
                      selected == elm ? "active selected" : ""
                    }`}
                  >
                    <span className="text">{elm.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
