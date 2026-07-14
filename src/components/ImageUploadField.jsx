import { useState, useRef } from "react";
import { Upload, Loader2, X, ImageIcon } from "lucide-react";

/*
  SETUP REQUIRED — one-time, in your Cloudinary dashboard (not code):

  1. Go to https://console.cloudinary.com/settings/upload
  2. Scroll to "Upload presets" → click "Add upload preset"
  3. Set "Signing Mode" to "Unsigned" — this is what allows the browser
     to upload directly without your backend needing to sign the request
  4. Give it a name, e.g. "goi_admin_uploads"
  5. Save, then note your Cloud Name (visible at the top of the dashboard —
     it's the same one already in your video URL: "f6quknu5")

  Then set these two constants below to match your actual values.
*/

const CLOUDINARY_CLOUD_NAME = "f6quknu5"; // matches your existing video URLs
const CLOUDINARY_UPLOAD_PRESET = "goi_admin_uploads"; // create this preset as above

export default function ImageUploadField({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleFile = async (file) => {
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
      onChange(data.secure_url);
    } catch (err) {
      console.error(err);
      setError(
        "Upload failed. Check your Cloudinary preset is set to Unsigned.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div>
      {value && (
        <div className="relative mb-3 group">
          <img
            src={value}
            alt={label || "Preview"}
            className="w-full h-40 object-cover rounded-lg border border-white/10"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-white/15 rounded-lg p-4 flex items-center justify-center gap-2 cursor-pointer hover:border-brand-cyan transition-colors text-sm text-white/60"
      >
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
          </>
        ) : (
          <>
            {value ? (
              <Upload className="w-4 h-4" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
            {value ? "Replace image" : "Click or drag an image here"}
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

      {/* Fallback — still allow pasting a URL directly, for cases like
                reusing an image already hosted elsewhere (e.g. Unsplash) */}
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="...or paste an image URL directly"
        className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 placeholder:text-white/30 focus:border-brand-cyan focus:outline-none"
      />
    </div>
  );
}
