import { useState, useRef } from "react";
import { Upload, Loader2, X, Plus } from "lucide-react";

const CLOUDINARY_CLOUD_NAME = "f6quknu5";
const CLOUDINARY_UPLOAD_PRESET = "goi_admin_uploads";

const CATEGORY_OPTIONS = [
  "Birthday Parties",
  "School Visits",
  "Corporate Events",
  "Game Zone",
];

// Like MultiImageUploadField, but each image also carries a category tag
// so the public Gallery page's category filter has real data to filter on.
// Value shape: [{ url: "...", category: "Game Zone" }, ...]
export default function GalleryUploadField({ value, onChange, label }) {
  const images = Array.isArray(value) ? value : [];
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const uploadFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Image is too large (max 8MB). Try compressing it first.");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange([...images, { url: data.secure_url, category: "Game Zone" }]);
    } catch (err) {
      console.error(err);
      setError(
        "Upload failed. Check your Cloudinary preset is set to Unsigned.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleFiles = (fileList) => {
    Array.from(fileList || []).forEach((f) => uploadFile(f));
  };

  const removeAt = (idx) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const setCategoryAt = (idx, category) => {
    onChange(images.map((img, i) => (i === idx ? { ...img, category } : img)));
  };

  return (
    <div>
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {images.map((img, idx) => (
            <div key={idx} className="relative group">
              <div className="relative aspect-[4/3] mb-1.5">
                <img
                  src={img.url}
                  alt={`${label || "Gallery"} ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg border border-white/10"
                />
                <button
                  type="button"
                  onClick={() => removeAt(idx)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove image ${idx + 1}`}
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
              {/* Category tag per image — this is what makes the
                                public Gallery filter buttons actually work */}
              <select
                value={img.category || "Game Zone"}
                onChange={(e) => setCategoryAt(idx, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white/70 focus:border-brand-cyan focus:outline-none"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c} className="bg-brand-ink">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-white/15 rounded-lg p-4 flex items-center justify-center gap-2 cursor-pointer hover:border-brand-cyan transition-colors text-sm text-white/60"
      >
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" /> Click or drag images here (multiple
            allowed)
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      <p className="text-[10px] text-white/30 mt-2">
        Pick a category per photo above so it shows up under the right filter on
        the public Gallery page.
      </p>
    </div>
  );
}
