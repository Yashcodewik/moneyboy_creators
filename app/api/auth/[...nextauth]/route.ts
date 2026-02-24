import { buildAuthOptions } from "@/libs/auth";
import NextAuth from "next-auth";

import { NextRequest } from "next/server";

const handler = (req: NextRequest, ctx: any) => {
  const authOptions = buildAuthOptions(req);
  return NextAuth(authOptions)(req, ctx);
};

export { handler as GET, handler as POST };
