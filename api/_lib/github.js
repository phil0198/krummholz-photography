// Thin wrapper around the GitHub Contents API. This is the site's only
// "database" — the admin panel reads and writes files in this repo
// directly, and Vercel's GitHub integration redeploys on every commit.
const OWNER = "phil0198";
const REPO = "krummholz-photography";
const BRANCH = "main";
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;

function authHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function getFile(path) {
  const res = await fetch(`${API_BASE}/contents/${path}?ref=${BRANCH}`, {
    headers: authHeaders(),
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub read failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return {
    sha: data.sha,
    content: Buffer.from(data.content, "base64").toString("utf-8"),
  };
}

export async function putFile({ path, content, message, sha, isBase64 = false }) {
  const body = {
    message,
    branch: BRANCH,
    content: isBase64 ? content : Buffer.from(content, "utf-8").toString("base64"),
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${API_BASE}/contents/${path}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`GitHub write failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}
