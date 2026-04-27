import fs from "fs";
import path from "path";
import { initializeApp, getApps, cert } from "firebase-admin/app";

function resolveServiceAccountPath() {
  let dir = process.cwd();
  for (let i = 0; i < 8; i++) {
    const candidate = path.join(dir, "scripts", "serviceAccountKey.json");
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function getServiceAccount() {
  const fromEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (fromEnv) {
    return JSON.parse(fromEnv);
  }
  const localPath = resolveServiceAccountPath();
  if (localPath) {
    return JSON.parse(fs.readFileSync(localPath, "utf8"));
  }
  throw new Error(
    "Firebase Admin: set FIREBASE_SERVICE_ACCOUNT_JSON or add scripts/serviceAccountKey.json locally (see serviceAccountKey.json.example)."
  );
}

export function ensureFirebaseAdmin() {
  if (getApps().length) return;

  const serviceAccount = getServiceAccount();
  const databaseURL =
    process.env.FIREBASE_DATABASE_URL ||
    "https://uet-panda-1c0e4-default-rtdb.asia-southeast1.firebasedatabase.app";

  initializeApp({
    credential: cert(serviceAccount),
    databaseURL,
  });
}
