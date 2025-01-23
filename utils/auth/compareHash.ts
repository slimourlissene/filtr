import crypto from "crypto-js";

const compareHash = (userPassword: string, storedHash: string) => {
  const userHash = crypto.SHA256(userPassword).toString();

  return userHash === storedHash;
};

export default compareHash;
