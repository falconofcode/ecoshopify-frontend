const normalizeApiBase = () => {
  const raw = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").trim();
  const base = raw.replace(/\/+$/, "");
  return base.endsWith("/api") ? base : `${base}/api`;
};

export const API_BASE_URL = normalizeApiBase();

export const saveSession = (data) => {
  localStorage.setItem("ecoshopify_token", data.token);
  localStorage.setItem("ecoshopify_user", JSON.stringify(data.user));
};

export const getSession = () => {
  try {
    const token = localStorage.getItem("ecoshopify_token");
    const user = JSON.parse(localStorage.getItem("ecoshopify_user") || "null");
    return token && user ? { token, user } : null;
  } catch {
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem("ecoshopify_token");
  localStorage.removeItem("ecoshopify_user");
};

export const authFetch = (path, options = {}) => {
  const session = getSession();
  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(session ? { Authorization: `Bearer ${session.token}` } : {}),
      ...options.headers,
    },
  });
};
