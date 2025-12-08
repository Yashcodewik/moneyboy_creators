// import CredentialsProvider from "next-auth/providers/credentials";
// import type { NextAuthOptions } from "next-auth";
// import { encrypt } from "./encryption.service";
// import { apiPost } from "../utils/endpoints/common";
// import { API_LOGIN } from "../utils/api/APIConstant";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("🔹 authorize called with credentials:", credentials);
//         try {
//           const res = await apiPost({
//             url: API_LOGIN,
//             values: {
//               email: credentials?.email,
//               password: credentials?.password,
//             },
//           });

//           console.log("🔹 API response:", res);

//           if (!res?.success || !res?.data?.token) {
//             console.log("❌ Login failed or token missing");
//             return null;
//           }

//           const u = res.data;
//           console.log("🔹 User extracted:", u);

//           return {
//             id: String(u._id ?? u.id ?? ""),
//             email: u.email,
//             name: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim(),
//             token: u.token,
//           };
//         } catch (err) {
//           console.log("❌ authorize error:", err);
//           return null;
//         }
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   callbacks: {
//     async jwt({ token, user }) {
//       console.log("🔹 jwt callback called with token:", token, "user:", user);
//       if (user) {
//         token.accessToken = (user as any).token;
//         token.role = (user as any).role ?? 0;
//         token.user = {
//           id: (user as any).id,
//           email: (user as any).email,
//           name: (user as any).name,
//         };
//       }
//       console.log("🔹 jwt token after modification:", token);
//       return token;
//     },

//     async session({ session, token }: { session: any; token: any }) {
//       console.log("🔹 session callback called (session access) with session:", session, "token:", token);

//       const sensitiveData = {
//         token: token.accessToken,
//         user: token.user,
//         isAuthenticated: !!token.accessToken,
//       };
//       const encrypted = encrypt(JSON.stringify(sensitiveData));
//       session.encrypted = encrypted;

//       // Remove old fields
//       delete session.user;
//       delete session.isAuthenticated;

//       console.log("🔹 Final session object returned:", session);
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };


// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import type { NextAuthOptions } from "next-auth";
// import { encrypt } from "./encryption.service";
// import { apiPost } from "../utils/endpoints/common";
// import { API_LOGIN } from "../utils/api/APIConstant";


// export const authOptions: NextAuthOptions = {
//   providers: [

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("🔹 authorize called with credentials:", credentials);
//         try {
//           const res = await apiPost({
//             url: API_LOGIN,
//             values: {
//               email: credentials?.email,
//               password: credentials?.password,
//             },
//           });

//           console.log("🔹 API response:", res);

//           if (!res?.success || !res?.data?.token) {
//             console.log("❌ Login failed or token missing");
//             return null;
//           }

//           const u = res.data;
//           console.log("🔹 User extracted:", u);

//           return {
//             id: String(u._id ?? u.id ?? ""),
//             email: u.email,
//             name: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim(),
//             token: u.token,
//           };
//         } catch (err) {
//           console.log("❌ authorize error:", err);
//           return null;
//         }
//       },
//     }),
    
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   session: { strategy: "jwt" },

//   callbacks: {
//     // ⬇️ Handle new user creation when signing in with Google
//     async signIn({ account, profile }) {
//       if (account?.provider === "google" && profile?.email) {
//         console.log("🟢 Google SignIn:", profile.email);
//         try {
         
//         } catch (err) {
//           console.error("❌ Google signIn error:", err);
//         }
//       }
//       return true;
//     },

//     async jwt({ token, user, account }) {
//       console.log("🔹 jwt callback called with token:", token, "user:", user);

//       // 🟣 For Credentials login
//       if (user && (user as any).token) {
//         token.accessToken = (user as any).token;
//         token.user = {
//           id: (user as any).id,
//           email: (user as any).email,
//           name: (user as any).name,
//         };
//       }

//       // 🟢 For Google login
//       if (account?.provider === "google" && user) {
//         token.user = {
//           id: token.sub,
//           email: (user as any).email ?? token.email,
//           name: (user as any).name ?? token.name,
//         };
//         token.accessToken = account.access_token;
//       }

//       console.log("🔹 jwt token after modification:", token);
//       return token;
//     },

//     async session({ session, token }: { session: any; token: any }) {
//       console.log("🔹 session callback called with session:", session, "token:", token);

//       const sensitiveData = {
//         token: token.accessToken,
//         user: token.user,
//         isAuthenticated: !!token.accessToken || !!token.user,
//       };

//       const encrypted = encrypt(JSON.stringify(sensitiveData));
//       session.encrypted = encrypted;
//       delete session.user;
//       delete session.isAuthenticated;

//       console.log("🔹 Final session object returned:", session);
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login", 
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { encrypt } from "./encryption.service";
import { apiPost } from "@/utils/endpoints/common";
import { API_LOGIN } from "@/utils/api/APIConstant";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        console.log("🔹 authorize called with credentials:", credentials);
        try {
          // 🟣 Normal login (email + password)
          if (credentials?.email && credentials?.password) {
            const res = await apiPost({
              url: API_LOGIN,
              values: {
                email: credentials.email,
                password: credentials.password,
              },
            });

            if (!res?.success || !res?.data?.token) return null;

            const u = res.data;
            return {
              id: String(u._id ?? u.id ?? ""),
              email: u.email,
              name: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim(),
              token: u.token,
            };
          }

          // 🟢 Social login (token from backend)
          if (credentials?.email && credentials?.token) {
            return {
              id: String(credentials.id ?? ""),
              email: credentials.email,
              name: credentials.name ?? "",
              token: credentials.token, // ✅ backend token
            };
          }

          return null;
        } catch (err) {
          console.log("❌ authorize error:", err);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      console.log("🔹 jwt callback — user:", user);

      // ✅ First login: attach backend token
      if (user && (user as any).token) {
        token.accessToken = (user as any).token;
        token.user = {
          id: (user as any).id,
          email: (user as any).email,
          name: (user as any).name,
        };
      }

      // ✅ Persist user info between refreshes
      if (!user && token?.user) {
        token.user = token.user;
      }

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {

      const sensitiveData = {
        token: token.accessToken,
        user: token.user,
        isAuthenticated: !!token.accessToken,
      };

      session.encrypted = encrypt(JSON.stringify(sensitiveData));

      // remove NextAuth’s default user object for safety
      delete session.user;
      delete session.isAuthenticated;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};



