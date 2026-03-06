import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    accessToken?: string;
    publicId?: string;
    role?: number;

    firstName?: string;
    lastName?: string;
    displayName?: string;
    userName?: string;
    profile?: string;
    coverImage?: string; 
    email?: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
    publicId?: string;
    isAuthenticated?: boolean;
    encrypted?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    publicId?: string;
    role?: number;
    user?: any;
  }
}