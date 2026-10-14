import { auth } from "@clerk/nextjs/server";

import { getImageKitEnv } from "@/env";
import { createImageKitAuth } from "@/lib/imagekit";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Authentication required" }, { status: 401 });
  }

  const env = getImageKitEnv();
  return Response.json(
    createImageKitAuth({
      publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    }),
  );
}
