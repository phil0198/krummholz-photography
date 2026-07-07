import crypto from "node:crypto";

const COOKIE_NAME = "kh_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 days

function sign(value) {
  return crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(value).digest("hex");
}

function timingSafeEqualStrings(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function checkPassword(candidate) {
  return timingSafeEqualStrings(String(candidate || ""), String(process.env.ADMIN_PASSWORD || ""));
}

export function createSessionCookie() {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const token = `${expires}.${sign(String(expires))}`;
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${MAX_AGE_SECONDS}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

function parseCookies(header) {
  const out = {};
  (header || "").split(";").forEach((part) => {
    const idx = part.indexOf("=");
    if (idx === -1) return;
    out[part.slice(0, idx).trim()] = part.slice(idx + 1).trim();
  });
  return out;
}

export function isAuthenticated(req) {
  const token = parseCookies(req.headers.cookie)[COOKIE_NAME];
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (!timingSafeEqualStrings(sign(expires), signature)) return false;
  return Number(expires) > Date.now();
}

export function requireAuth(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "Not authenticated" });
    return false;
  }
  return true;
}
