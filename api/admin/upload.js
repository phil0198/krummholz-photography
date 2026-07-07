import { requireAuth } from "../_lib/auth.js";
import { getFile, putFile } from "../_lib/github.js";

// Only allow writes under public/photos/<slug>/<filename>.<ext> — this is
// the one endpoint that accepts a path from the client, so keep it strict.
const SAFE_PATH = /^photos\/[a-z0-9-]+\/[a-z0-9._-]+\.(jpg|jpeg|png|webp)$/i;
const DATA_URL = /^data:image\/(?:jpeg|jpg|png|webp);base64,(.+)$/;

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  if (req.method !== "POST") return res.status(405).end();

  const { path, dataUrl } = req.body || {};
  if (typeof path !== "string" || !SAFE_PATH.test(path)) {
    return res.status(400).json({ error: "Invalid image path" });
  }

  const match = DATA_URL.exec(dataUrl || "");
  if (!match) {
    return res.status(400).json({ error: "Invalid image data" });
  }

  const fullPath = `public/${path}`;
  try {
    const existing = await getFile(fullPath);
    const result = await putFile({
      path: fullPath,
      content: match[1],
      isBase64: true,
      sha: existing?.sha,
      message: `Upload photo: ${path}`,
    });
    return res.status(200).json({ ok: true, path: `/${path}`, sha: result.content.sha });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
