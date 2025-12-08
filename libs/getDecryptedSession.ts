import { getSession } from "next-auth/react";
import { decrypt } from "./encryption.service";

export const getDecryptedSession = async () => {
  const session: any = await getSession();
  if (!session?.encrypted) return null;

  try {
    return JSON.parse(decrypt(session.encrypted));
  } catch (error) {
    console.error("Failed to decrypt session:", error);
    return null;
  }
};
