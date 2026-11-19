const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
export async function apiFetch(path: string, init: RequestInit = {}) {
  const tokenResponse = await fetch("/api/token", { cache: "no-store" });
  const tokenData = tokenResponse.ok ? await tokenResponse.json() : {};
  const headers = new Headers(init.headers);
  if (tokenData.token) headers.set("Authorization", `Bearer ${tokenData.token}`);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const response = await fetch(API + path, { ...init, headers, cache: "no-store" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}
export const imageUpload = async (file: File) => {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) throw new Error("Image upload is not configured. Add your imgbb API key.");
  const form = new FormData(); form.append("image", file);
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: form });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error("Could not upload this image.");
  return data.data.url as string;
};
