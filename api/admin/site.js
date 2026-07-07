import { requireAuth } from "../_lib/auth.js";
import { getFile, putFile } from "../_lib/github.js";

const PATH = "src/data/site.json";

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;

  if (req.method === "GET") {
    const file = await getFile(PATH);
    if (!file) return res.status(404).json({ error: "site.json not found" });
    return res.status(200).json({ site: JSON.parse(file.content), sha: file.sha });
  }

  if (req.method === "PUT") {
    const { site, sha } = req.body || {};
    if (!site || typeof site !== "object") {
      return res.status(400).json({ error: "site must be an object" });
    }
    try {
      const result = await putFile({
        path: PATH,
        content: JSON.stringify(site, null, 2) + "\n",
        sha,
        message: "Update site settings via admin panel",
      });
      return res.status(200).json({ ok: true, sha: result.content.sha });
    } catch (err) {
      return res.status(409).json({ error: err.message });
    }
  }

  res.status(405).end();
}
