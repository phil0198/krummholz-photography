import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { adminApi } from "@/lib/adminApi";
import CollectionForm from "@/components/admin/CollectionForm";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CollectionsEditor() {
  const [collections, setCollections] = useState(null);
  const [sha, setSha] = useState(null);
  const [activeSlug, setActiveSlug] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | saving | error
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getCollections()
      .then((data) => {
        setCollections(data.collections);
        setSha(data.sha);
        setActiveSlug(data.collections[0]?.slug ?? null);
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, []);

  function updateCollection(slug, updater) {
    setCollections((prev) => prev.map((c) => (c.slug === slug ? updater(c) : c)));
  }

  function addCollection() {
    const title = window.prompt("Collection title?");
    if (!title) return;
    const slug = slugify(title);
    if (!slug || collections.some((c) => c.slug === slug)) {
      window.alert("Please choose a different, unused title.");
      return;
    }
    setCollections((prev) => [
      ...prev,
      {
        slug,
        title,
        standfirst: "",
        cover: { src: `/photos/${slug}/cover.jpg`, alt: "" },
        intro: [""],
        images: [],
      },
    ]);
    setActiveSlug(slug);
  }

  function removeCollection(slug) {
    if (!window.confirm("Delete this collection? This can't be undone once saved.")) return;
    setCollections((prev) => {
      const next = prev.filter((c) => c.slug !== slug);
      setActiveSlug(next[0]?.slug ?? null);
      return next;
    });
  }

  async function handleSave() {
    setStatus("saving");
    setError("");
    try {
      const result = await adminApi.saveCollections(collections, sha);
      setSha(result.sha);
      setStatus("ready");
    } catch (err) {
      setError(err.message);
      setStatus("ready");
    }
  }

  if (status === "loading") return <p className="text-sm text-smoke">Loading…</p>;
  if (status === "error" && !collections) return <p className="text-sm text-red-400">{error}</p>;

  const active = collections.find((c) => c.slug === activeSlug);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-2">
        {collections.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setActiveSlug(c.slug)}
            className={`border px-4 py-2 text-sm ${
              c.slug === activeSlug ? "border-accent text-bone" : "border-ink-3 text-smoke hover:text-bone"
            }`}
          >
            {c.title || "(untitled)"}
          </button>
        ))}
        <button
          type="button"
          onClick={addCollection}
          className="flex items-center gap-1.5 border border-dashed border-ink-3 px-4 py-2 text-sm text-smoke hover:text-bone"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New collection
        </button>
      </div>

      {active && (
        <CollectionForm
          collection={active}
          onChange={(updater) => updateCollection(active.slug, updater)}
          onDelete={() => removeCollection(active.slug)}
        />
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleSave}
        disabled={status === "saving"}
        className="w-fit bg-bone px-6 py-3 text-sm uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "saving" ? "Saving…" : "Save all changes"}
      </button>
    </div>
  );
}
