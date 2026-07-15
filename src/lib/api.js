import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;
export const LOGO_URL = `${process.env.PUBLIC_URL}/gameon.png`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("goi_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (
      err.response?.status === 401 &&
      window.location.pathname.startsWith("/admin") &&
      window.location.pathname !== "/admin/login"
    ) {
      localStorage.removeItem("goi_admin_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  },
);

export const fetchBranches = () => api.get("/branches").then((r) => r.data);
export const fetchBranch = (slug) =>
  api.get(`/branches/${slug}`).then((r) => r.data);
export const fetchGames = (params) =>
  api.get("/games", { params }).then((r) => r.data);
export const fetchOffers = (branch) =>
  api.get("/offers", { params: branch ? { branch } : {} }).then((r) => r.data);
export const fetchCardOffers = (branch) =>
  api
    .get("/card-offers", { params: branch ? { branch } : {} })
    .then((r) => r.data);
export const fetchUpcoming = () =>
  api.get("/upcoming-stores").then((r) => r.data);
export const fetchTestimonials = () =>
  api.get("/testimonials").then((r) => r.data);
export const fetchContactInfo = () =>
  api.get("/contact-info").then((r) => r.data);

// query filters, matching the same optional-params pattern as fetchGames.
export const fetchBlogPosts = (params) =>
  api.get("/blog-posts", { params }).then((r) => r.data);
export const fetchBlogPost = (slug) =>
  api.get(`/blog-posts/${slug}`).then((r) => r.data);

export const createBooking = (data) =>
  api.post("/bookings", data).then((r) => r.data);
export const createFranchise = (data) =>
  api.post("/franchise-enquiries", data).then((r) => r.data);
export const createCareer = (data) =>
  api.post("/careers", data).then((r) => r.data);
export const createContact = (data) =>
  api.post("/contact", data).then((r) => r.data);
export const notifyMe = (data) =>
  api.post("/notify-me", data).then((r) => r.data);
export const subscribeNewsletter = (data) =>
  api.post("/newsletter", data).then((r) => r.data);

// Admin
export const adminLogin = (data) =>
  api.post("/admin/login", data).then((r) => r.data);
export const adminMe = () => api.get("/admin/me").then((r) => r.data);
export const adminList = (coll) =>
  api.get(`/admin/${coll}`).then((r) => r.data);
export const adminCreate = (coll, data) =>
  api.post(`/admin/${coll}`, data).then((r) => r.data);
export const adminUpdate = (coll, id, data) =>
  api.put(`/admin/${coll}/${id}`, data).then((r) => r.data);
export const adminDelete = (coll, id) =>
  api.delete(`/admin/${coll}/${id}`).then((r) => r.data);
export const adminUpdateContact = (data) =>
  api.put("/admin/contact-info", data).then((r) => r.data);
export const adminSubmissions = (kind) =>
  api.get(`/admin/submissions/${kind}`).then((r) => r.data);

// export async function adminUpdateSubmissionStatus(kind, id, status) {
//   const res = await fetch(`${API_BASE}/admin/submissions/${kind}/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("goi_admin_token")}`,
//     },
//     body: JSON.stringify({ status }),
//   });
//   if (!res.ok) throw new Error("Failed to update status");
//   return res.json();
// }
export const adminUpdateSubmissionStatus = (kind, id, status) =>
  api.put(`/admin/submissions/${kind}/${id}`, { status }).then((r) => r.data);

export const fetchGalleryImages = (params) =>
  api.get("/gallery-images", { params }).then((r) => r.data);
