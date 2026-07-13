import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  Save,
  Trash2,
  Edit2,
  X,
  Loader2,
  LayoutDashboard,
  MapPin,
  Gamepad2,
  Gift,
  CreditCard,
  Building2,
  MessageSquare,
  Settings,
  Inbox,
  ChevronDown,
  ChevronUp,
  Filter,
  FileText,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminList,
  adminCreate,
  adminUpdate,
  adminDelete,
  adminUpdateContact,
  adminSubmissions,
  fetchContactInfo,
  LOGO_URL,
  adminUpdateSubmissionStatus,
} from "@/lib/api";

const TABS = [
  { key: "branches", label: "Branches", icon: Building2, singular: "Branch" },
  {
    key: "card_offers",
    label: "Card Offers",
    icon: CreditCard,
    singular: "Card Offer",
  },
  { key: "offers", label: "Offers", icon: Gift, singular: "Offer" },
  {
    key: "upcoming_stores",
    label: "Upcoming Stores",
    icon: MapPin,
    singular: "Upcoming Store",
  },
  {
    key: "testimonials",
    label: "Reviews",
    icon: MessageSquare,
    singular: "Review",
  },
  { key: "games", label: "Games", icon: Gamepad2, singular: "Game" },
  {
    key: "blog_posts",
    label: "Blog Posts",
    icon: FileText,
    singular: "Blog Post",
  },
  {
    key: "contact_info",
    label: "Global Info & SEO",
    icon: Settings,
    singular: "Global Info",
  },
  { key: "submissions", label: "Submissions", icon: Inbox, singular: "" },
];

// Field schemas per collection
const SCHEMAS = {
  branches: [
    { k: "slug", label: "Slug (url)", type: "text" },
    { k: "name", label: "Name", type: "text" },
    { k: "city", label: "City", type: "text" },
    { k: "state", label: "State", type: "text" },
    { k: "address", label: "Address", type: "textarea" },
    { k: "phone", label: "Phone", type: "text" },
    {
      k: "whatsapp",
      label: "WhatsApp number (digits only, e.g. 917710661100)",
      type: "text",
    },
    { k: "email", label: "Email", type: "email" },
    { k: "timings.open", label: "Opens at (HH:MM)", type: "text" },
    { k: "timings.close", label: "Closes at (HH:MM)", type: "text" },
    { k: "map_query", label: "Google Maps search query", type: "text" },
    { k: "parking", label: "Parking info", type: "text" },
    { k: "facilities", label: "Facilities (comma separated)", type: "csv" },
    { k: "hero_image", label: "Hero image URL", type: "text" },
    {
      k: "gallery",
      label: "Gallery image URLs (comma separated)",
      type: "csv",
    },
  ],
  card_offers: [
    {
      k: "branch_slug",
      label: "Branch slug (jalandhar/amritsar/zirakpur/pune)",
      type: "text",
    },
    { k: "card_value", label: "Card value ₹", type: "number" },
    { k: "points", label: "Points given", type: "number" },
    { k: "bonus_note", label: "Bonus note (optional)", type: "text" },
    { k: "order", label: "Sort order (1,2,3...)", type: "number" },
  ],
  offers: [
    { k: "title", label: "Title", type: "text" },
    { k: "description", label: "Description", type: "textarea" },
    { k: "tag", label: "Tag (Weekday/Party/Student...)", type: "text" },
    { k: "branches", label: "Branches (comma separated slugs)", type: "csv" },
    { k: "valid_till", label: "Valid till (YYYY-MM-DD)", type: "text" },
  ],
  upcoming_stores: [
    { k: "slug", label: "Slug", type: "text" },
    { k: "name", label: "Full name", type: "text" },
    { k: "city", label: "City", type: "text" },
    { k: "state", label: "State", type: "text" },
    { k: "expected", label: "Expected (e.g., Q2 2026)", type: "text" },
    { k: "progress", label: "Progress %", type: "number" },
    { k: "image", label: "Image URL", type: "text" },
  ],
  testimonials: [
    { k: "name", label: "Customer name", type: "text" },
    { k: "city", label: "City", type: "text" },
    { k: "rating", label: "Rating (1-5)", type: "number" },
    { k: "text", label: "Review", type: "textarea" },
    { k: "avatar", label: "Initials (2 letters)", type: "text" },
  ],
  games: [
    { k: "slug", label: "Slug", type: "text" },
    { k: "name", label: "Name", type: "text" },
    { k: "category", label: "Category", type: "text" },
    { k: "image", label: "Image URL", type: "text" },
    { k: "min_age", label: "Min age", type: "number" },
    { k: "difficulty", label: "Difficulty (Easy/Medium/Hard)", type: "text" },
    { k: "credits", label: "Credits", type: "number" },
    { k: "description", label: "Description", type: "textarea" },
    { k: "branches", label: "Branches (comma separated slugs)", type: "csv" },
  ],
  blog_posts: [
    {
      k: "slug",
      label: "Slug (url, e.g. best-birthday-party-jalandhar)",
      type: "text",
    },
    { k: "title", label: "Title", type: "text" },
    {
      k: "excerpt",
      label: "Excerpt (short summary shown on the blog list card)",
      type: "textarea",
    },
    {
      k: "content",
      label:
        'Content (HTML — use <p>, <h2>, <strong>, <a href="/branches/slug">)',
      type: "longtext",
    },
    { k: "image", label: "Image URL", type: "text" },
    {
      k: "category",
      label: "Category (e.g. Party Guides, Games, Corporate Events)",
      type: "text",
    },
    {
      k: "branch_slug",
      label:
        "Related branch slug (optional — jalandhar/amritsar/zirakpur/pune)",
      type: "text",
    },
    { k: "date", label: "Date (YYYY-MM-DD)", type: "text" },
    {
      k: "published",
      label: "Published (uncheck to save as draft)",
      type: "boolean",
    },
  ],
  contact_info: [
    { k: "hq_address", label: "HQ Address", type: "textarea" },
    { k: "hq_phone", label: "HQ Phone", type: "text" },
    { k: "hq_email", label: "HQ Email", type: "email" },
    {
      k: "whatsapp_number",
      label: "Floating WhatsApp number (digits, e.g. 917710661100)",
      type: "text",
    },
    { k: "instagram", label: "Instagram URL", type: "text" },
    { k: "facebook", label: "Facebook URL", type: "text" },
    { k: "youtube", label: "YouTube URL", type: "text" },
    { k: "seo_title", label: "SEO Title", type: "text" },
    { k: "seo_description", label: "SEO Description", type: "textarea" },
    {
      k: "seo_keywords",
      label: "SEO Keywords (comma separated)",
      type: "textarea",
    },
  ],
};

const SUBMISSION_TYPES = [
  { k: "bookings", l: "Bookings" },
  { k: "franchise", l: "Franchise" },
  { k: "careers", l: "Careers" },
  { k: "contact", l: "Contact" },
  { k: "notify", l: "Notify Signups" },
  { k: "newsletter", l: "Newsletter" },
];

// Which short fields to show as detail cards, per submission type — matches
// the actual fields each backend Pydantic model actually has. This is what
// was missing before: every type was rendering the Booking-shaped fields
// regardless of whether it actually had them.
const SUBMISSION_FIELDS = {
  bookings: [
    { k: "booking_type", label: "Booking Type" },
    { k: "branch", label: "Branch" },
    { k: "preferred_date", label: "Preferred Date" },
    { k: "preferred_time", label: "Preferred Time" },
    { k: "guests", label: "Guests" },
  ],
  franchise: [
    { k: "city", label: "City" },
    { k: "investment_range", label: "Investment Range" },
    { k: "space_available", label: "Space Available" },
  ],
  careers: [
    { k: "position", label: "Position" },
    { k: "branch", label: "Branch" },
    { k: "experience", label: "Experience" },
  ],
  contact: [{ k: "subject", label: "Subject" }],
  notify: [{ k: "upcoming_store", label: "Notify Me About" }],
  newsletter: [],
};

// Which field (if any) holds the longer free-text note for each type
const SUBMISSION_LONGTEXT = {
  bookings: { k: "special_requirements", label: "Special Requirements" },
  franchise: { k: "message", label: "Message" },
  careers: { k: "cover_letter", label: "Cover Letter" },
  contact: { k: "message", label: "Message" },
  notify: null,
  newsletter: null,
};

function buildWhatsAppMessage(kind, s) {
  const name = s.name || "there";
  switch (kind) {
    case "bookings":
      return `Hi ${name}! This is Game On India. We've received your booking request for ${s.branch} on ${s.preferred_date} at ${s.preferred_time} for ${s.guests} guest(s). Just confirming — does this still work for you?`;
    case "franchise":
      return `Hi ${name}! Thanks for your franchise enquiry for ${s.city}. We'd love to discuss the opportunity — when's a good time for a quick call?`;
    case "careers":
      return `Hi ${name}! Thanks for applying for ${s.position} at our ${s.branch} branch. We've received your application and will be in touch shortly.`;
    case "contact":
      return `Hi ${name}! Thanks for reaching out to Game On India regarding "${s.subject}". How can we help?`;
    default:
      return `Hi ${name}! This is Game On India, following up on your recent submission.`;
  }
}
function getNested(obj, path) {
  return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}
function setNested(obj, path, value) {
  const parts = path.split(".");
  const clone = { ...obj };
  let cur = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    cur[parts[i]] = { ...(cur[parts[i]] || {}) };
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
  return clone;
}

function fieldFromValue(schema, value) {
  if (schema.type === "csv")
    return Array.isArray(value) ? value.join(", ") : value || "";
  if (schema.type === "number") return value == null ? "" : String(value);
  if (schema.type === "boolean") return !!value;
  return value == null ? "" : value;
}
function valueFromField(schema, raw) {
  if (schema.type === "csv")
    return String(raw)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  if (schema.type === "number") return raw === "" ? null : Number(raw);
  if (schema.type === "boolean") return !!raw;
  return raw;
}

function ItemForm({ schema, initial, onSave, onCancel, saving }) {
  const [data, setData] = useState(initial || {});
  const set = (k, v) => setData((d) => setNested(d, k, v));
  return (
    <div className="space-y-3">
      {schema.map((s) => (
        <div key={s.k}>
          <label className="text-xs uppercase tracking-widest text-white/50 mb-1.5 block">
            {s.label}
          </label>
          {s.type === "textarea" ? (
            <textarea
              rows="3"
              value={fieldFromValue(s, getNested(data, s.k))}
              onChange={(e) => set(s.k, valueFromField(s, e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:border-brand-cyan focus:outline-none resize-none text-sm"
            />
          ) : s.type === "longtext" ? (
            <textarea
              rows="12"
              value={fieldFromValue(s, getNested(data, s.k))}
              onChange={(e) => set(s.k, valueFromField(s, e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:border-brand-cyan focus:outline-none resize-y text-sm font-mono"
            />
          ) : s.type === "boolean" ? (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!fieldFromValue(s, getNested(data, s.k))}
                onChange={(e) => set(s.k, valueFromField(s, e.target.checked))}
                className="w-4 h-4 rounded accent-brand-magenta"
              />
              <span className="text-sm text-white/70">
                {getNested(data, s.k) ? "Published" : "Draft"}
              </span>
            </label>
          ) : (
            <input
              type={
                s.type === "number"
                  ? "number"
                  : s.type === "email"
                    ? "email"
                    : "text"
              }
              value={fieldFromValue(s, getNested(data, s.k))}
              onChange={(e) => set(s.k, valueFromField(s, e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:border-brand-cyan focus:outline-none text-sm"
            />
          )}
        </div>
      ))}
      <div className="flex gap-2 pt-3">
        <button
          onClick={() => onSave(data)}
          disabled={saving}
          className="goi-btn-primary text-sm disabled:opacity-50"
          data-testid="admin-save-btn"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}{" "}
          Save
        </button>
        {onCancel && (
          <button onClick={onCancel} className="goi-btn-outline text-sm">
            <X className="w-4 h-4" /> Cancel
          </button>
        )}
      </div>
    </div>
  );
}

function CollectionEditor({ collectionKey, schema }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // item or "new"
  const [saving, setSaving] = useState(false);

  // const load = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await adminList(collectionKey);
  //     setItems(data);
  //   } catch {
  //     toast.error("Failed to load");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   load();
  // }, [collectionKey]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);

  //     try {
  //       const data = await adminList(collectionKey);
  //       setItems(data);
  //     } catch (err) {
  //       console.error(err);
  //       toast.error("Failed to load");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [collectionKey]);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const data = await adminList(collectionKey);
      setItems(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load");
    } finally {
      setLoading(false);
    }
  }, [collectionKey]);

  useEffect(() => {
    load();
  }, [load]);

  // eslint-disable-next-line
  const save = async (data) => {
    setSaving(true);
    try {
      if (editing === "new") {
        await adminCreate(collectionKey, data);
        toast.success("Created");
      } else {
        await adminUpdate(collectionKey, editing.id, data);
        toast.success("Saved");
      }
      setEditing(null);
      await load();
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const del = async (item) => {
    if (
      !confirm(`Delete "${item.name || item.title || item.slug || item.id}"?`)
    )
      return;
    try {
      await adminDelete(collectionKey, item.id);
      toast.success("Deleted");
      await load();
    } catch {
      toast.error("Delete failed");
    }
  };

  const displayField = (it) =>
    it.name ||
    it.title ||
    it.slug ||
    it.city ||
    `Card ₹${it.card_value} → ${it.points}pts (${it.branch_slug})` ||
    it.id;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div className="text-white/60 text-sm">{items.length} items</div>
        <button
          onClick={() => setEditing("new")}
          data-testid={`admin-add-${collectionKey}-btn`}
          className="goi-btn-primary text-sm"
        >
          <Plus className="w-4 h-4" /> Add new
        </button>
      </div>

      {editing && (
        <div
          className="goi-card rounded-2xl p-6 mb-6"
          data-testid="admin-editor"
        >
          <div className="font-display font-bold text-xl mb-4">
            {editing === "new" ? "Add new" : "Edit"}
          </div>
          <ItemForm
            schema={schema}
            initial={editing === "new" ? {} : editing}
            onSave={save}
            onCancel={() => setEditing(null)}
            saving={saving}
          />
        </div>
      )}

      {loading ? (
        <div className="text-white/50 py-10 text-center">
          <Loader2 className="w-6 h-6 animate-spin inline" />
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((it) => (
            <div
              key={it.id}
              className="goi-card rounded-xl p-4 flex items-center justify-between gap-4"
              data-testid={`admin-row-${collectionKey}-${it.id}`}
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate flex items-center gap-2">
                  {displayField(it)}
                  {collectionKey === "blog_posts" && !it.published && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 uppercase tracking-widest font-bold">
                      Draft
                    </span>
                  )}
                </div>
                <div className="text-xs text-white/40 truncate">
                  {it.description ||
                    it.text ||
                    it.excerpt ||
                    it.category ||
                    it.city ||
                    it.branch_slug ||
                    ""}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditing(it)}
                  data-testid={`admin-edit-${it.id}`}
                  className="p-2 rounded-lg border border-white/10 hover:border-brand-cyan hover:text-brand-cyan"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => del(it)}
                  data-testid={`admin-delete-${it.id}`}
                  className="p-2 rounded-lg border border-white/10 hover:border-red-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-white/40 text-sm py-8 text-center">
              No items yet. Add one above.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ContactInfoEditor() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContactInfo()
      .then(setData)
      .catch(() => setData({}));
  }, []);

  const save = async (form) => {
    setSaving(true);
    try {
      await adminUpdateContact(form);
      setData(form);
      toast.success("Saved. Site updated instantly.");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!data)
    return (
      <div className="text-white/50 py-10 text-center">
        <Loader2 className="w-6 h-6 animate-spin inline" />
      </div>
    );
  return (
    <div className="goi-card rounded-2xl p-6">
      <ItemForm
        schema={SCHEMAS.contact_info}
        initial={data}
        onSave={save}
        saving={saving}
      />
    </div>
  );
}

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];

const STATUS_STYLES = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  completed: "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
};

function SubmissionsViewer() {
  const [kind, setKind] = useState("bookings");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  // const load = () => {
  //   setLoading(true);
  //   adminSubmissions(kind)
  //     .then(setItems)
  //     .catch(() => setItems([]))
  //     .finally(() => setLoading(false));
  // };

  // useEffect(() => {
  //   load();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   setExpandedId(null);
  //   setStatusFilter("all");
  // }, [kind]);
  // useEffect(() => {
  //   setLoading(true);

  //   adminSubmissions(kind)
  //     .then(setItems)
  //     .catch(() => setItems([]))
  //     .finally(() => setLoading(false));

  //   setExpandedId(null);
  //   setStatusFilter("all");
  // }, [kind]);
  const load = useCallback(async () => {
    setLoading(true);

    try {
      const data = await adminSubmissions(kind);
      setItems(data);
    } catch (err) {
      console.error(err);
      setItems([]);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  }, [kind]);
  useEffect(() => {
    load();
    setExpandedId(null);
    setStatusFilter("all");
  }, [load]);

  const toggle = (id) => setExpandedId((cur) => (cur === id ? null : id));

  const changeStatus = async (item, newStatus) => {
    setUpdatingId(item.id);
    const prev = item.status;
    setItems((cur) =>
      cur.map((it) => (it.id === item.id ? { ...it, status: newStatus } : it)),
    );
    try {
      await adminUpdateSubmissionStatus(kind, item.id, newStatus);
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
      setItems((cur) =>
        cur.map((it) => (it.id === item.id ? { ...it, status: prev } : it)),
      );
    } finally {
      setUpdatingId(null);
    }
  };
  const filtered =
    statusFilter === "all"
      ? items
      : items.filter((it) => (it.status || "pending") === statusFilter);

  const counts = items.reduce((acc, it) => {
    const s = it.status || "pending";
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const fields = SUBMISSION_FIELDS[kind] || [];
  const longtext = SUBMISSION_LONGTEXT[kind];

  return (
    <div>
      {/* Submission type tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SUBMISSION_TYPES.map((t) => (
          <button
            key={t.k}
            onClick={() => setKind(t.k)}
            data-testid={`admin-sub-tab-${t.k}`}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${kind === t.k ? "bg-brand-magenta border-brand-magenta" : "border-white/10 text-white/70"}`}
          >
            {t.l}
          </button>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-white/40" />
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${statusFilter === "all" ? "bg-white/15 border-white/30" : "border-white/10 text-white/60"}`}
        >
          All ({items.length})
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border capitalize ${
              statusFilter === s
                ? STATUS_STYLES[s]
                : "border-white/10 text-white/60"
            }`}
          >
            {s} ({counts[s] || 0})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-white/50 py-10 text-center">
          <Loader2 className="w-6 h-6 animate-spin inline" />
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="text-white/40 text-sm py-8 text-center">
              No submissions yet.
            </div>
          )}
          {filtered.map((s, i) => {
            const id = s.id || i;
            const isOpen = expandedId === id;
            const status = s.status || "pending";
            const hasMobile = Boolean(s.mobile);
            const displayName = s.name || s.email || "Submission";
            return (
              <div
                key={id}
                className="goi-card rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-all overflow-hidden"
              >
                {/* Collapsed header - click to expand */}
                <button
                  onClick={() => toggle(id)}
                  className="w-full flex justify-between items-center gap-4 p-5 text-left"
                >
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold truncate">
                      {displayName}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-white/60">
                      {s.email && (
                        <span className="truncate">📧 {s.email}</span>
                      )}
                      {hasMobile && <span>📞 {s.mobile}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${STATUS_STYLES[status] || STATUS_STYLES.pending}`}
                    >
                      {status.toUpperCase()}
                    </span>
                    <span className="text-xs text-white/40 hidden sm:inline">
                      {s.created_at
                        ? new Date(s.created_at).toLocaleString("en-IN")
                        : ""}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-white/50" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/50" />
                    )}
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-xs uppercase text-white/50">
                        Update status
                      </label>
                      <select
                        value={status}
                        disabled={updatingId === s.id}
                        onChange={(e) => changeStatus(s, e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm capitalize focus:border-brand-cyan focus:outline-none disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="bg-brand-ink capitalize"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {fields.length > 0 && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {fields.map(
                          (f) =>
                            s[f.k] != null &&
                            s[f.k] !== "" && (
                              <div
                                key={f.k}
                                className="goi-card p-4 rounded-xl bg-white/5"
                              >
                                <div className="text-xs text-white/50 uppercase">
                                  {f.label}
                                </div>
                                <div className="font-semibold mt-1">
                                  {String(s[f.k])}
                                </div>
                              </div>
                            ),
                        )}
                      </div>
                    )}

                    {longtext && s[longtext.k] && (
                      <div className="mt-5">
                        <div className="text-xs uppercase text-white/50 mb-2">
                          {longtext.label}
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 text-white/80">
                          {s[longtext.k]}
                        </div>
                      </div>
                    )}

                    {kind === "careers" && s.resume_url && (
                      <div className="mt-5">
                        <a
                          href={s.resume_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-cyan hover:underline text-sm"
                        >
                          View resume ↗
                        </a>
                      </div>
                    )}

                    {/* Contact actions — only show what's actually possible.
                        Email is always available (all submission types require
                        it except mobile/name aren't guaranteed). Call/WhatsApp
                        only appear if a mobile number actually exists. */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      {s.email && (
                        <a
                          href={`mailto:${s.email}`}
                          className="goi-btn-outline"
                        >
                          <Mail className="w-4 h-4" /> Email
                        </a>
                      )}
                      {hasMobile && (
                        <>
                          <a
                            href={`tel:${s.mobile}`}
                            className="goi-btn-outline"
                          >
                            📞 Call
                          </a>
                          <a
                            href={`https://wa.me/${s.mobile}?text=${encodeURIComponent(buildWhatsAppMessage(kind, s))}`}
                            target="_blank"
                            rel="noreferrer"
                            className="goi-btn-primary"
                          >
                            WhatsApp
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState("branches");
  const navigate = useNavigate();
  const username = localStorage.getItem("goi_admin_username") || "admin";

  const logout = () => {
    localStorage.removeItem("goi_admin_token");
    localStorage.removeItem("goi_admin_username");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-brand-ink" data-testid="admin-dashboard">
      <header className="border-b border-white/10 bg-brand-surface sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Game On India" className="h-10 w-auto" />
            <div>
              <div className="text-[10px] tracking-widest uppercase text-brand-cyan font-bold">
                Admin
              </div>
              <div className="font-display font-bold text-sm leading-none">
                Dashboard
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50 hidden sm:inline">
              Signed in as{" "}
              <span className="text-white font-semibold">{username}</span>
            </span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-cyan hover:underline hidden sm:inline"
            >
              View site ↗
            </a>
            <button
              onClick={logout}
              data-testid="admin-logout-btn"
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-white/10 hover:border-brand-magenta hover:text-brand-magenta"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid md:grid-cols-[220px_1fr] gap-8">
        <aside>
          <div className="goi-card rounded-2xl p-3 sticky top-24">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                data-testid={`admin-tab-${t.key}`}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 text-left ${tab === t.key ? "bg-brand-magenta/15 text-brand-magenta" : "text-white/70 hover:bg-white/5"}`}
              >
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </div>
        </aside>

        <main>
          <div className="mb-6">
            <div className="goi-overline mb-2">Manage</div>
            <h1 className="font-display font-black text-3xl">
              {TABS.find((t) => t.key === tab)?.label}
            </h1>
          </div>
          {tab === "contact_info" ? (
            <ContactInfoEditor />
          ) : tab === "submissions" ? (
            <SubmissionsViewer />
          ) : (
            <CollectionEditor collectionKey={tab} schema={SCHEMAS[tab]} />
          )}
        </main>
      </div>
    </div>
  );
}
