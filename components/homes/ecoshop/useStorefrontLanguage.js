"use client";

import { useEffect, useState } from "react";

export function useStorefrontLanguage() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedDirection = JSON.parse(
      window.localStorage.getItem("direction") || "null"
    )?.dir;
    const direction = savedDirection || document.documentElement.dir;
    setLanguage(direction === "rtl" ? "ar" : "en");
  }, []);

  return language;
}
