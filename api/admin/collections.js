import { requireAuth } from "../_lib/auth.js";
import { getFile, putFile } from "../_lib/github.js";

const PATH = "src/data/collections.json";

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;

  if (req.method === "GET") {
    const file = await getFile(PATH);
    if (!file) return res.status(404).json({ error: "collections.json not found" });
    return res.status(200).json({ collections: JSON.parse(file.content), sha: file.sha });
  }

  if (req.method === "PUT") {
    const { collections, sha } = req.body || {};
    if (!Array.isArray(collections)) {
      return res.status(400).json({ error: "collections must be an array" });
    }
    try {
      const result = await putFile({
        path: PATH,
        content: JSON.stringify(collections, null, 2) + "\n",
        sha,
        message: "Update collections via admin panel",
      });
      return res.status(200).json({ ok: true, sha: result.content.sha });
    } catch (err) {
      return res.status(409).json({ error: err.message });
    }
  }

  res.status(405).end();
}
