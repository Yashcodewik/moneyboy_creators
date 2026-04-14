import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiPost } from "@/utils/endpoints/common";
import { encrypt } from "./encryption.service";
import {
  API_VERIFY_OTP,
  API_LOGIN,
  API_SOCIAL_LOGIN,
  API_SOCIAL_ACTIVATE,
  API_SOCIAL_REGISTER,
} from "@/utils/api/APIConstant";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { getToken } from "next-auth/jwt";
import { serverApiPost } from "@/utils/api/serverApi";
import { NextRequest } from "next/server";

export const buildAuthOptions = (req?: NextRequest | any): NextAuthOptions => ({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("Authorize called with:", credentials);

        if (!credentials?.email) {
          throw new Error("email_required");
        }

        let res: any;

        if (credentials.password) {
          res = await apiPost({
            url: API_LOGIN,
            values: {
              email: credentials.email,
              password: credentials.password,
            },
          });
        } else if (credentials.otp) {
          res = await apiPost({
            url: API_VERIFY_OTP,
            values: {
              email: credentials.email,
              otp: credentials.otp,
            },
          });
        } else {
          throw new Error("credentials_missing");
        }

        console.log(res, "res=================res");

        if (!res?.isVerified) {
          throw new Error(res?.message || "authentication_failed");
        }
        console.log("1111111111=================res");
        if (!res?.success) {
          throw new Error(res?.message || "authentication_failed");
        }
        console.log("222222222=================res");

        if (!res.token) {
          console.log("OTP verified but token not returned");
          return { stage: "otp_verified", ...res };
        }
        console.log("33333333=================res");

        const userData = {
          id: res.user._id,
          email: res.user.email,
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          displayName: res.user.displayName,
          userName: res.user.userName,
          profile: res.user.profile,
          coverImage: res.user.coverImage,
          role: res.user.role,
          accessToken: res.token,
          publicId: res.user.publicId,
        };

        console.log("Authorize returning userData:", userData);
        return userData;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

 TwitterProvider({
  clientId: process.env.TWITTER_CLIENT_ID!,
  clientSecret: process.env.TWITTER_CLIENT_SECRET!,
  version: "2.0",
  authorization: {
    params: {
      scope: "tweet.read tweet.write users.read offline.access",
    },
  },
}),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/",
    error: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "twitter") {
        const existingToken = req
          ? await getToken({ req, secret: process.env.NEXTAUTH_SECRET! })
          : null;
        const userType = req?.cookies?.get("userType")?.value;

        if (!user?.email) {
          user.email = `${account.providerAccountId}@twitter.oauth`;
        }
        const accessToken = existingToken?.accessToken as string | undefined;
        try {
          let res;
if (userType === "Activities") {
  if (!accessToken) {
    console.log("❌ No token found → social connect FAILED");
    return "/login";
  }

  console.log("TWITTER ACCOUNT:", account);

const twitterAccessToken = account?.access_token;
const twitterRefreshToken = account?.refresh_token;

  const res = await serverApiPost({
    url: API_SOCIAL_ACTIVATE,
    values: {
      provider: account.provider,
      providerAccountId: account.providerAccountId,
      email: user.email,
        accessToken: twitterAccessToken,
  refreshToken: twitterRefreshToken,
    },
    token: accessToken,
  });

  // 🔥 CLEAR LOGS
  if (res?.success) {
    console.log("✅ X CONNECTED SUCCESSFULLY");
    console.log("User:", res?.user || "No user returned");
  } else {
    console.log("❌ X CONNECTION FAILED");
    console.log("Response:", res);
  }

  return "/feed";
}
          if (userType === "Login") {
            res = await serverApiPost({
              url: API_SOCIAL_LOGIN,
              values: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                email: user.email,
              },
            });
            if (!res?.success) {
              return "/login?error=not_registered";
            }
            user.id = res.user._id;
            user.accessToken = res.token;
            user.publicId = res.user.publicId;
            user.role = res.user.role;
            user.firstName = res.user.firstName;
            user.lastName = res.user.lastName;
            user.displayName = res.user.displayName;
            user.userName = res.user.userName;
            user.profile = res.user.profile;
            user.coverImage = res.user.coverImage;
            return true;
          }

          if (userType === "Creator" || userType === "User") {
            res = await serverApiPost({
              url: API_SOCIAL_REGISTER,
              values: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                email: user.email,
                name: user.name,
                role: userType,
              },
            });
            if (!res?.success && userType === "User") {
              return "/signup?error=not_registered";
            }
            if (res?.success && userType === "Creator") {
              return "/creator?q=" + res?.token;
            }
          }

          if (!res?.success) {
            console.log("API success false:", res);
          }

          if (userType !== "Activities") {
            user.id = res.user._id;
            user.accessToken = res.token;
            user.publicId = res.user.publicId;
            user.role = res.user.role;

            // 🔥 ADD THESE LINES
            user.firstName = res.user.firstName;
            user.lastName = res.user.lastName;
            user.displayName = res.user.displayName;
            user.userName = res.user.userName;
            user.email = res.user.email;
            user.profile = res.user.profile;
            user.coverImage = res.user.coverImage;
          }

          return true;
        } catch (err) {
          console.error("Social login failed:", err);
          return false;
        }
      }

      return true;
    },

    // async jwt({ token, user }: { token: any; user: any }) {
    //   if (user) {
    //     token.sub = user.id;
    //     token.user = user;
    //     token.accessToken = user.accessToken;
    //     token.publicId = user.publicId;
    //     token.role = user.role;
    //   }

    //   return token;
    // },

    async jwt({ token, user, trigger, session }: any) {
      // 🔥 When user logs in
      if (user) {
        token.sub = user.id;
        token.user = user;
        token.accessToken = user.accessToken;
        token.publicId = user.publicId;
        token.role = user.role;
      }

      // 🔥 When useSession().update() is called
      if (trigger === "update" && session?.user) {
        token.user = {
          ...token.user,
          ...session.user,
        };
      }

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (token?.user) {
        session.user = token.user;
        session.user.role = token.role;
        session.user.publicId = token.publicId;
        session.accessToken = token.accessToken;
        session.publicId = token.publicId;
        session.isAuthenticated = true;
      } else {
        session.user = null;
        session.isAuthenticated = false;
      }

      if (token?.accessToken) {
        const sensitiveData = {
          token: token.accessToken,
          user: token.user,
          publicId: token.publicId,
          isAuthenticated: true,
        };

        try {
          session.encrypted = encrypt(JSON.stringify(sensitiveData));
          // delete session.user;
          // delete session.isAuthenticated;
          return session;
        } catch (err) {
          console.error("Failed to encrypt session data:", err);
        }
      }
      return session;
    },
  },
});
