import { createHmac, randomBytes } from "node:crypto";

const TOKEN_LIFETIME_SECONDS = 10 * 60;

type ImageKitAuthInput = {
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
  now?: number;
};

export type ImageKitAuthResponse = {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
  urlEndpoint: string;
};

/** Generate short-lived browser upload credentials without exposing the private key. */
export function createImageKitAuth({
  publicKey,
  privateKey,
  urlEndpoint,
  now = Math.floor(Date.now() / 1000),
}: ImageKitAuthInput): ImageKitAuthResponse {
  const token = randomBytes(24).toString("hex");
  const expire = now + TOKEN_LIFETIME_SECONDS;
  const signature = createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex");

  return { token, expire, signature, publicKey, urlEndpoint };
}
