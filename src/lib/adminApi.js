async function request(path, options = {}) {
  const res = await fetch(`/api/admin/${path}`, {
    method: options.method || "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const adminApi = {
  session: () => request("session"),
  login: (password) => request("login", { method: "POST", body: { password } }),
  logout: () => request("logout", { method: "POST" }),
  getCollections: () => request("collections"),
  saveCollections: (collections, sha) =>
    request("collections", { method: "PUT", body: { collections, sha } }),
  getSite: () => request("site"),
  saveSite: (site, sha) => request("site", { method: "PUT", body: { site, sha } }),
  uploadImage: (path, dataUrl) => request("upload", { method: "POST", body: { path, dataUrl } }),
};
