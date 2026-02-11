import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    accessToken?: string;
    publicId?: string;
    role?: string;
  }

  interface Session {
    user: User | null;
    isAuthenticated?: boolean;
    encrypted?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    publicId?: string;
    user?: any;
  }
}
