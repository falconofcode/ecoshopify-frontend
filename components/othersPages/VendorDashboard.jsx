"use client";
import { useCallback, useEffect, useState } from "react";
import { authFetch, clearSession, getSession } from "@/utlis/auth";
import { useRouter } from "next/navigation";

export default function VendorDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", stock: "0", categoryId: "" });
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const me = await authFetch("/vendors/me").then((r) => r.json());
    setProfile(me.vendorProfile || null);
    if (!me.vendorProfile?.isApproved) return;

    const [s, p, c] = await Promise.all([
      authFetch("/vendors/dashboard/stats").then((r) => r.json()),
      authFetch("/vendors/products").then((r) => r.json()),
      authFetch("/categories").then((r) => r.json()),
    ]);
    setStats(s);
    setProducts(p.products || []);
    setCategories(c.categories || []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addProduct = async (e) => {
    e.preventDefault();
    const res = await authFetch("/vendors/products", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(res.ok ? "Product created" : data.message);
    if (res.ok) {
      setForm({ title: "", price: "", stock: "0", categoryId: "" });
      load();
    }
  };

  const removeProduct = async (id) => {
    await authFetch(`/vendors/products/${id}`, { method: "DELETE" });
    load();
  };

  const logout = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="d-flex justify-content-between mb_30">
          <h5>{profile ? profile.storeName : "Seller dashboard"} — {getSession()?.user.name}</h5>
          <button className="tf-btn btn-line" onClick={logout}>Log out</button>
        </div>

        {profile && !profile.isApproved && (
          <p className="text-warning">
            Your store is awaiting admin approval. You can add products once it is approved.
          </p>
        )}

        {stats && (
          <p>
            Products: <b>{stats.products}</b> · Orders: <b>{stats.orders}</b> · Revenue: <b>{stats.revenue}</b>
          </p>
        )}

        {profile?.isApproved && (
          <>
            <form onSubmit={addProduct} className="mb_30">
              <h6 className="mb_15">Add product</h6>
              <input className="tf-input mb_15" placeholder="Title" required value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input className="tf-input mb_15" placeholder="Price" type="number" min="0" step="0.01" required value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <input className="tf-input mb_15" placeholder="Stock" type="number" min="0" value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              <select className="tf-input mb_15" required value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <button className="tf-btn btn-fill radius-3" type="submit">Add product</button>
              {message && <p className="mt-2">{message}</p>}
            </form>

            <h6 className="mb_15">My products</h6>
            <table className="table">
              <thead><tr><th>Title</th><th>Price</th><th>Stock</th><th /></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.price}</td>
                    <td>{p.stock}</td>
                    <td><button className="tf-btn btn-line" onClick={() => removeProduct(p.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
}
