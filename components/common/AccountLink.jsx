"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession } from "@/utlis/auth";

const ACCOUNT_PATHS = {
  CUSTOMER: "/my-account",
  VENDOR: "/vendor/dashboard",
  ADMIN: "/admin/dashboard",
};

// Shows "Login" (linking to /login) for guests, and the user's name linking to their account when signed in.
export default function AccountLink({ isArabic = false, showText = false, className = "nav-icon-item" }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getSession()?.user || null);
  }, []);

  if (user) {
    const firstName = String(user.name || "").split(" ")[0];
    return (
      <Link
        href={ACCOUNT_PATHS[user.role] || "/my-account"}
        className={`${className} align-items-center gap-10`}
        aria-label={isArabic ? "حسابي" : "My account"}
      >
        <i className="icon icon-account" />
        {showText && <span className="text">{firstName}</span>}
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className={`${className} align-items-center gap-10`}
      aria-label={isArabic ? "تسجيل الدخول" : "Login"}
    >
      <i className="icon icon-account" />
      {showText && <span className="text">{isArabic ? "دخول" : "Login"}</span>}
    </Link>
  );
}
