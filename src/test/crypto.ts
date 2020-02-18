import crypto from "crypto";

const hash = crypto
    .createHash("sha256")
    .update(new Date().toString())
    .digest("base64");

console.log(hash);
