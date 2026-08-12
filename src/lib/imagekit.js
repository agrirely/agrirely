import ImageKit from "@imagekit/nodejs";

let client = null;

export function getImageKit() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("Missing IMAGEKIT_PRIVATE_KEY in environment variables");
  }
  if (!client) {
    client = new ImageKit({ privateKey });
  }
  return client;
}

export function getImageKitUrlEndpoint() {
  const endpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  if (!endpoint) {
    throw new Error("Missing IMAGEKIT_URL_ENDPOINT in environment variables");
  }
  return endpoint.replace(/\/$/, "");
}
