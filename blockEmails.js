const crypto = require("crypto");
const readline = require("readline");

// Replace these with your actual blocked emails
const blockedEmails = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter email(s), separated by spaces: ", (answer) => {
  const cliEmails = answer.trim().split(/\s+/);
  blockedEmails.push(...cliEmails);

  const hashes = blockedEmails.map(email =>
    crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex")
  );

  console.log("SHA-256 hashes:");
  hashes.forEach(h => console.log(`, "${h}"`));

  rl.close();
});