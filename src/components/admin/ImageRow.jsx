import { useState } from "react";
import { ChevronDown, ChevronUp, Loader2, Trash2, UploadCloud } from "lucide-react";
import { adminApi } from "@/lib/adminApi";
import { resizeImageFile } from "@/lib/resizeImage";
import Photo from "@/components/Photo";
import { fieldClass } from "@/components/admin/fieldStyles";

export default function ImageRow({ image, isFirst, isLast, onChange, onMove, onRemove }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(file) {
    setUploading(true);
    setError("");
    try {
      const dataUrl = await resizeImageFile(file);
      await adminApi.uploadImage(image.src.replace(/^\//, ""), dataUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-4 border border-ink-3 p-4 sm:grid-cols-[140px_1fr_auto]">
      <Photo src={image.src} alt={image.alt} aspectClassName="aspect-square" />

      <div className="flex flex-col gap-2">
        <textarea
          value={image.alt}
          onChange={(event) => onChange((img) => ({ ...img, alt: event.target.value }))}
          rows={2}
          placeholder="Alt text (for accessibility)"
          className={fieldClass}
        />
        <input
          value={image.caption}
          onChange={(event) => onChange((img) => ({ ...img, caption: event.target.value }))}
          placeholder="Caption (shown in the lightbox)"
          className={fieldClass}
        />
        <label className="inline-flex w-fit cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.15em] text-smoke hover:text-bone">
          {uploading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <UploadCloud className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          Replace photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
        </label>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>

      <div className="flex flex-row gap-1 sm:flex-col">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => onMove(-1)}
          className="p-2 text-smoke hover:text-bone disabled:opacity-30"
          aria-label="Move image up"
        >
          <ChevronUp className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          disabled={isLast}
          onClick={() => onMove(1)}
          className="p-2 text-smoke hover:text-bone disabled:opacity-30"
          aria-label="Move image down"
        >
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-red-400/80 hover:text-red-400"
          aria-label="Remove image"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
