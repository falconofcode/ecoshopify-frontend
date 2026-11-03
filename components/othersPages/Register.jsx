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

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "CUSTOMER",
    storeName: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        password: form.password,
        role: form.role,
        ...(form.role === "VENDOR"
          ? {
              storeName: form.storeName || `${form.firstName || "Vendor"}'s Store`,
              description: form.description,
            }
          : {}),
      };

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("ecoshopify_token", data.token);
      localStorage.setItem("ecoshopify_user", JSON.stringify(data.user));
      setSuccess("Registration successful. Redirecting...");

      setTimeout(() => router.push("/"), 800);
    } catch (err) {
      setError(err.message || "Unable to register right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="form-register-wrap">
          <div className="flat-title align-items-start gap-0 mb_30 px-0">
            <h5 className="mb_18">Register</h5>
            <p className="text_black-2">
              Sign up for early Sale access plus tailored new arrivals, trends
              and promotions. To opt out, click unsubscribe in our emails
            </p>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className=""
              id="register-form"
              acceptCharset="utf-8"
            >
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
                <label className="tf-field-label fw-4 text_black-2" htmlFor="firstName">
                  First name
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
                <label className="tf-field-label fw-4 text_black-2" htmlFor="lastName">
                  Last name
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  autoComplete="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <label className="tf-field-label fw-4 text_black-2" htmlFor="email">
                  Email *
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <label className="tf-field-label fw-4 text_black-2" htmlFor="password">
                  Password *
                </label>
              </div>

              <div className="tf-field style-1 mb_15">
                <select
                  className="tf-field-input tf-input"
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="VENDOR">Vendor</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <label className="tf-field-label fw-4 text_black-2" htmlFor="role">
                  Account role
                </label>
              </div>

              {form.role === "VENDOR" && (
                <>
                  <div className="tf-field style-1 mb_15">
                    <input
                      className="tf-field-input tf-input"
                      placeholder=" "
                      type="text"
                      id="storeName"
                      name="storeName"
                      value={form.storeName}
                      onChange={handleChange}
                    />
                    <label className="tf-field-label fw-4 text_black-2" htmlFor="storeName">
                      Store name
                    </label>
                  </div>
                  <div className="tf-field style-1 mb_30">
                    <textarea
                      className="tf-field-input tf-input"
                      placeholder=" "
                      id="description"
                      name="description"
                      rows="4"
                      value={form.description}
                      onChange={handleChange}
                    />
                    <label className="tf-field-label fw-4 text_black-2" htmlFor="description">
                      Store description
                    </label>
                  </div>
                </>
              )}

              {error && <p className="text-danger mb_20">{error}</p>}
              {success && <p className="text-success mb_20">{success}</p>}

              <div className="mb_20">
                <button
                  type="submit"
                  className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
              <div className="text-center">
                <Link href={`/login`} className="tf-btn btn-line">
                  Already have an account? Log in here
                  <i className="icon icon-arrow1-top-left" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
