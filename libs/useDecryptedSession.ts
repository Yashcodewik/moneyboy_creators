import { useSession } from "next-auth/react";
import { decrypt } from "./encryption.service";

export const useDecryptedSession = () => {
  const { data: session, status }: any = useSession();
  if (status === "loading") return { session: null, status };
  if (!session?.encrypted) return { session: null, status };

  try {
    const decrypted = JSON.parse(decrypt(session.encrypted));

    return { session: decrypted, status };
    
  } catch (error) {
    console.error("Failed to decrypt session:", error);
    return { session: null, status };
  }
};
