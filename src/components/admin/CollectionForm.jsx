import { useState } from "react";
import { Loader2, Plus, Trash2, UploadCloud } from "lucide-react";
import { adminApi } from "@/lib/adminApi";
import { resizeImageFile } from "@/lib/resizeImage";
import Photo from "@/components/Photo";
import ImageRow from "@/components/admin/ImageRow";
import { fieldClass, fieldLabelClass } from "@/components/admin/fieldStyles";

export default function CollectionForm({ collection, onChange, onDelete }) {
  const [uploadingCover, setUploadingCover] = useState(false);
  const [addProgress, setAddProgress] = useState(null); // { done, total } | null
  const [error, setError] = useState("");

  function setField(key, value) {
    onChange((c) => ({ ...c, [key]: value }));
  }

  function setIntroText(text) {
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    setField("intro", paragraphs.length ? paragraphs : [""]);
  }

  async function handleCoverUpload(file) {
    setUploadingCover(true);
    setError("");
    try {
      const dataUrl = await resizeImageFile(file);
      const path = `photos/${collection.slug}/cover.jpg`;
      await adminApi.uploadImage(path, dataUrl);
      setField("cover", { ...collection.cover, src: `/${path}` });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingCover(false);
    }
  }

  function updateImage(id, updater) {
    setField(
      "images",
      collection.images.map((img) => (img.id === id ? updater(img) : img)),
    );
  }

  function moveImage(id, direction) {
    const index = collection.images.findIndex((img) => img.id === id);
    const swapWith = index + direction;
    if (swapWith < 0 || swapWith >= collection.images.length) return;
    const next = [...collection.images];
    [next[index], next[swapWith]] = [next[swapWith], next[index]];
    setField("images", next);
  }

  function removeImage(id) {
    if (!window.confirm("Remove this image from the gallery?")) return;
    setField(
      "images",
      collection.images.filter((img) => img.id !== id),
    );
  }

  async function handleAddPhotos(fileList) {
    const files = Array.from(fileList);
    if (!files.length) return;
    setError("");
    setAddProgress({ done: 0, total: files.length });

    const newImages = [];
    for (const file of files) {
      const id = `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const path = `photos/${collection.slug}/${id}.jpg`;
      try {
        const dataUrl = await resizeImageFile(file);
        await adminApi.uploadImage(path, dataUrl);
        newImages.push({ id, src: `/${path}`, alt: "", caption: "" });
      } catch (err) {
        setError(err.message);
      }
      setAddProgress((prev) => (prev ? { ...prev, done: prev.done + 1 } : prev));
    }

    if (newImages.length) {
      setField("images", [...collection.images, ...newImages]);
    }
    setAddProgress(null);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={fieldLabelClass}>Title</span>
          <input
            value={collection.title}
            onChange={(event) => setField("title", event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={fieldLabelClass}>Slug (URL — not editable)</span>
          <input value={collection.slug} disabled className={`${fieldClass} opacity-60`} />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={fieldLabelClass}>Standfirst (short line shown on /work)</span>
        <textarea
          value={collection.standfirst}
          onChange={(event) => setField("standfirst", event.target.value)}
          rows={2}
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className={fieldLabelClass}>Intro copy (separate paragraphs with a blank line)</span>
        <textarea
          value={collection.intro.join("\n\n")}
          onChange={(event) => setIntroText(event.target.value)}
          rows={6}
          className={fieldClass}
        />
      </label>

      <div className="flex flex-col gap-3">
        <span className={fieldLabelClass}>Cover image</span>
        <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
          <Photo src={collection.cover.src} alt={collection.cover.alt} aspectClassName="aspect-[4/5]" />
          <div className="flex flex-col gap-3">
            <textarea
              value={collection.cover.alt}
              onChange={(event) => setField("cover", { ...collection.cover, alt: event.target.value })}
              rows={3}
              placeholder="Alt text / description"
              className={fieldClass}
            />
            <label className="inline-flex w-fit cursor-pointer items-center gap-2 border border-ink-3 px-3 py-2 text-xs uppercase tracking-[0.15em] text-smoke hover:text-bone">
              {uploadingCover ? (
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
                  if (file) handleCoverUpload(file);
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className={fieldLabelClass}>Gallery images ({collection.images.length})</span>
          <label
            className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-smoke hover:text-bone ${
              addProgress ? "opacity-60" : "cursor-pointer"
            }`}
          >
            {addProgress ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                Uploading {addProgress.done}/{addProgress.total}…
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                Add photos
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={!!addProgress}
              className="hidden"
              onChange={(event) => {
                const files = Array.from(event.target.files || []);
                event.target.value = "";
                if (files.length) handleAddPhotos(files);
              }}
            />
          </label>
        </div>

        {collection.images.map((image, index) => (
          <ImageRow
            key={image.id}
            image={image}
            isFirst={index === 0}
            isLast={index === collection.images.length - 1}
            onChange={(updater) => updateImage(image.id, updater)}
            onMove={(direction) => moveImage(image.id, direction)}
            onRemove={() => removeImage(image.id)}
          />
        ))}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={onDelete}
        className="flex w-fit items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-red-400/80 hover:text-red-400"
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
        Delete this collection
      </button>
    </div>
  );
}
