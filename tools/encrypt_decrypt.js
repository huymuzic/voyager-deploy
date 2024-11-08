import crypto from "crypto";

export function generate_key(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");
}

export function encrypt_message(key, plaintext) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(plaintext, "utf8", "base64");
  encrypted += cipher.final("base64");
  return iv.toString("base64") + ":" + encrypted;
}

export function decrypt_message(key, ciphertext) {
  const parts = ciphertext.split(":");
  const iv = Buffer.from(parts.shift(), "base64");
  const encryptedText = parts.join(":");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
