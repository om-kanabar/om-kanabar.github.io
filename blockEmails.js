
import crypto from "crypto";

// Replace these with your actual blocked emails
const blockedEmails = [];

const hashes = blockedEmails.map(email =>
  crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex")
);

console.log("SHA-256 hashes:");
hashes.forEach(h => console.log(h));