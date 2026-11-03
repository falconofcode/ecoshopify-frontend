"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch, clearSession } from "@/utlis/auth";

export default function AdminDashboard() {
  const router = useRouter();
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const load = useCallback(async () => {
    const [v, c] = await Promise.all([
      authFetch("/vendors/requests").then((r) => r.json()),
      authFetch("/categories").then((r) => r.json()),
    ]);
    setVendors(v.vendors || []);
    setCategories(c.categories || []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setApproval = async (id, isApproved) => {
    await authFetch(`/vendors/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ isApproved }),
    });
    load();
  };

  const addCategory = async (e) => {
    e.preventDefault();
    await authFetch("/categories", { method: "POST", body: JSON.stringify({ name: categoryName }) });
    setCategoryName("");
    load();
  };

  const logout = () => {
    clearSession();
    router.push("/admin/login");
  };

  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="d-flex justify-content-between mb_30">
          <h5>Admin dashboard</h5>
          <button className="tf-btn btn-line" onClick={logout}>Log out</button>
        </div>

        <h6 className="mb_15">Seller applications</h6>
        <table className="table mb_30">
          <thead><tr><th>Store</th><th>Owner</th><th>Status</th><th /></tr></thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id}>
                <td>{v.storeName}</td>
                <td>{v.user.name} ({v.user.email})</td>
                <td>{v.isApproved ? "Approved" : "Pending"}</td>
                <td>
                  <button className="tf-btn btn-line" onClick={() => setApproval(v.id, !v.isApproved)}>
                    {v.isApproved ? "Suspend" : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h6 className="mb_15">Categories</h6>
        <form onSubmit={addCategory} className="mb_15">
          <input className="tf-input mb_15" placeholder="New category" required value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)} />
          <button className="tf-btn btn-fill radius-3" type="submit">Add category</button>
        </form>
        <ul>{categories.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
      </div>
    </section>
  );
}
