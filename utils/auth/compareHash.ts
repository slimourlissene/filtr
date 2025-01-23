import crypto from "crypto-js";

export default function compareHash (userPassword: string, storedHash: string) {
  const userHash = crypto.SHA256(userPassword).toString();

  return userHash === storedHash;
};
