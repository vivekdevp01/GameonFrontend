import { useState, useRef } from "react";
import { Upload, Loader2, X, Plus, Check } from "lucide-react";
import { adminCreate } from "@/lib/api";

const CLOUDINARY_CLOUD_NAME = "f6quknu5";
const CLOUDINARY_UPLOAD_PRESET = "goi_admin_uploads";

const CATEGORY_OPTIONS = [
  "Birthday Parties",
  "School Visits",
  "Corporate Events",
  "Game Zone",
];

/*
  Bulk gallery upload — lets an admin select/drag MANY photos at once,
  pick ONE shared category + branch for the whole batch, and creates
  one separate gallery_images document per photo automatically. This is
  what the plain single-image "Add new" form can't do — that form is
  correct for editing one specific photo's details later, this is for
  fast initial batch uploads.

  Usage: rendered only when collectionKey === "gallery_images", as an
  alternative to the standard "Add new" flow.
*/
export default function GalleryBulkUploadForm({ onDone }) {
  const [files, setFiles] = useState([]); // { file, previewUrl, status: "pending"|"uploading"|"done"|"error" }
  const [category, setCategory] = useState("Game Zone");
  const [branchSlug, setBranchSlug] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []).filter((f) =>
      f.type.startsWith("image/"),
    );
    const withPreview = picked.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      status: "pending",
    }));
    setFiles((prev) => [...prev, ...withPreview]);
  };

  const removeAt = (idx) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const uploadOne = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );
    if (!res.ok) throw new Error("Cloudinary upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  const handleUploadAll = async () => {
    if (files.length === 0) return;
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      setFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, status: "uploading" } : f)),
      );
      try {
        const url = await uploadOne(files[i].file);
        await adminCreate("gallery_images", {
          url,
          category,
          branch_slug: branchSlug,
          caption: "",
        });
        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: "done" } : f)),
        );
      } catch (err) {
        console.error(err);
        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: "error" } : f)),
        );
      }
    }

    setUploading(false);
    onDone?.();
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50 mb-1.5 block">
            Category for this batch
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand-cyan focus:outline-none"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c} className="bg-brand-ink">
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50 mb-1.5 block">
            Branch slug (optional, applies to whole batch)
          </label>
          <input
            type="text"
            value={branchSlug}
            onChange={(e) => setBranchSlug(e.target.value)}
            placeholder="jalandhar / amritsar / zirakpur / pune"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand-cyan focus:outline-none"
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {files.map((f, idx) => (
            <div key={idx} className="relative aspect-square">
              <img
                src={f.previewUrl}
                alt=""
                className={`w-full h-full object-cover rounded-lg border ${
                  f.status === "error" ? "border-red-500" : "border-white/10"
                }`}
              />
              {f.status === "uploading" && (
                <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                </div>
              )}
              {f.status === "done" && (
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5 text-brand-lime" />
                </div>
              )}
              {f.status === "pending" && (
                <button
                  type="button"
                  onClick={() => removeAt(idx)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-white/15 rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-brand-cyan transition-colors text-sm text-white/60"
      >
        <Plus className="w-5 h-5" />
        Click or drag multiple photos here at once
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      <button
        onClick={handleUploadAll}
        disabled={files.length === 0 || uploading}
        className="goi-btn-primary text-sm disabled:opacity-50 w-full justify-center"
      >
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Uploading{" "}
            {files.filter((f) => f.status === "done").length}/{files.length}...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" /> Upload all{" "}
            {files.length > 0 ? `(${files.length})` : ""} photos
          </>
        )}
      </button>
    </div>
  );
}
