import { useEffect, useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { adminApi } from "@/lib/adminApi";
import { resizeImageFile } from "@/lib/resizeImage";
import Photo from "@/components/Photo";
import { fieldClass, fieldLabelClass } from "@/components/admin/fieldStyles";

const TEXT_FIELDS = [
  { key: "name", label: "Site name" },
  { key: "tagline", label: "Tagline" },
  { key: "photographer", label: "Photographer name" },
  { key: "instagramHandle", label: "Instagram handle" },
  { key: "instagramUrl", label: "Instagram URL" },
  { key: "email", label: "Contact email" },
  { key: "location", label: "Location" },
  { key: "workHeading", label: "Work page heading" },
];

const IMAGE_FIELDS = [
  { key: "heroImage", label: "Homepage hero image", path: "photos/home/hero.jpg" },
  { key: "portrait", label: "About page portrait", path: "photos/home/portrait.jpg" },
];

export default function SiteEditor() {
  const [site, setSite] = useState(null);
  const [sha, setSha] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | saving | error
  const [error, setError] = useState("");
  const [uploadingKey, setUploadingKey] = useState(null);

  useEffect(() => {
    adminApi
      .getSite()
      .then((data) => {
        setSite(data.site);
        setSha(data.sha);
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, []);

  function updateField(key, value) {
    setSite((prev) => ({ ...prev, [key]: value }));
  }

  function setParagraphsField(key, text) {
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    updateField(key, paragraphs.length ? paragraphs : [""]);
  }

  async function handleImageUpload(key, path, file) {
    setUploadingKey(key);
    setError("");
    try {
      const dataUrl = await resizeImageFile(file);
      await adminApi.uploadImage(path, dataUrl);
      updateField(key, { ...site[key], src: `/${path}` });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingKey(null);
    }
  }

  async function handleSave() {
    setStatus("saving");
    setError("");
    try {
      const result = await adminApi.saveSite(site, sha);
      setSha(result.sha);
      setStatus("ready");
    } catch (err) {
      setError(err.message);
      setStatus("ready");
    }
  }

  if (status === "loading") return <p className="text-sm text-smoke">Loading…</p>;
  if (status === "error" && !site) return <p className="text-sm text-red-400">{error}</p>;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-6 sm:grid-cols-2">
        {TEXT_FIELDS.map((field) => (
          <label key={field.key} className="flex flex-col gap-2">
            <span className={fieldLabelClass}>{field.label}</span>
            <input
              value={site[field.key] || ""}
              onChange={(event) => updateField(field.key, event.target.value)}
              className={fieldClass}
            />
          </label>
        ))}
      </div>

      <label className="flex flex-col gap-2">
        <span className={fieldLabelClass}>
          About page bio (separate paragraphs with a blank line)
        </span>
        <textarea
          value={site.bio.join("\n\n")}
          onChange={(event) => setParagraphsField("bio", event.target.value)}
          rows={8}
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className={fieldLabelClass}>
          Work page intro (separate paragraphs with a blank line)
        </span>
        <textarea
          value={site.workIntro.join("\n\n")}
          onChange={(event) => setParagraphsField("workIntro", event.target.value)}
          rows={4}
          className={fieldClass}
        />
      </label>

      {IMAGE_FIELDS.map(({ key, label, path }) => (
        <div key={key} className="flex flex-col gap-3 border-t border-ink-3 pt-6">
          <span className={fieldLabelClass}>{label}</span>
          <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
            <Photo src={site[key].src} alt={site[key].alt} aspectClassName="aspect-[4/5]" />
            <div className="flex flex-col gap-3">
              <textarea
                value={site[key].alt}
                onChange={(event) => updateField(key, { ...site[key], alt: event.target.value })}
                rows={3}
                placeholder="Alt text / description"
                className={fieldClass}
              />
              <label className="inline-flex w-fit cursor-pointer items-center gap-2 border border-ink-3 px-3 py-2 text-xs uppercase tracking-[0.15em] text-smoke hover:text-bone">
                {uploadingKey === key ? (
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
                    if (file) handleImageUpload(key, path, file);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      ))}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleSave}
        disabled={status === "saving"}
        className="w-fit bg-bone px-6 py-3 text-sm uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "saving" ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}
