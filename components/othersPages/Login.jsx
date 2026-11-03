"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const normalizeApiBase = () => {
  const raw = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").trim();
  const base = raw.replace(/\/+$/, "");
  return base.endsWith("/api") ? base : `${base}/api`;
};

const API_BASE_URL = normalizeApiBase();

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("ecoshopify_token", data.token);
      localStorage.setItem("ecoshopify_user", JSON.stringify(data.user));
      router.push("/");
    } catch (err) {
      setError(err.message || "Unable to log in right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="tf-grid-layout lg-col-2 tf-login-wrap">
          <div className="tf-login-form">
            <div id="recover">
              <h5 className="mb_24">Reset your password</h5>
              <p className="mb_30">
                We will send you an email to reset your password
              </p>
              <div>
                <form onSubmit={(e) => e.preventDefault()} className="">
                  <div className="tf-field style-1 mb_15">
                    <input
                      className="tf-field-input tf-input"
                      placeholder=""
                      required
                      type="email"
                      autoComplete="email"
                      id="recover-email"
                      name="email"
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="recover-email"
                    >
                      Email *
                    </label>
                  </div>
                  <div className="mb_20">
                    <a href="#login" className="tf-btn btn-line">
                      Cancel
                    </a>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                    >
                      Reset password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div id="login">
              <h5 className="mb_36">Log in</h5>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="tf-field style-1 mb_15">
                    <input
                      required
                      className="tf-field-input tf-input"
                      placeholder=""
                      type="email"
                      autoComplete="email"
                      id="login-email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="login-email"
                    >
                      Email *
                    </label>
                  </div>
                  <div className="tf-field style-1 mb_30">
                    <input
                      required
                      className="tf-field-input tf-input"
                      placeholder=""
                      type="password"
                      id="login-password"
                      name="password"
                      autoComplete="current-password"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="login-password"
                    >
                      Password *
                    </label>
                  </div>
                  {error && <p className="text-danger mb_20">{error}</p>}
                  <div className="mb_20">
                    <a href="#recover" className="tf-btn btn-line">
                      Forgot your password?
                    </a>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Log in"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="tf-login-content">
            <h5 className="mb_36">I'm new here</h5>
            <p className="mb_20">
              Sign up for early Sale access plus tailored new arrivals, trends
              and promotions. To opt out, click unsubscribe in our emails.
            </p>
            <Link href={`/register`} className="tf-btn btn-line">
              Register
              <i className="icon icon-arrow1-top-left" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
