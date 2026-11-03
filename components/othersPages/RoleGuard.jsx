"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/utlis/auth";

// Client-side gate for UX only; the API enforces roles on every request.
export default function RoleGuard({ role, loginPath, children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session || session.user.role !== role) {
      router.replace(loginPath);
    } else {
      setReady(true);
    }
  }, [role, loginPath, router]);

  return ready ? children : null;
}
