"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import { PUBLIC_ROUTES, ROLE_ROUTES } from "@/libs/publicRoutes";


export default function RoleRouteGuard({
children,
}: {
children: React.ReactNode;
}) {
const { session, status } = useDecryptedSession();
const router = useRouter();
const pathname = usePathname();

useEffect(() => {
// wait until session loads
if (status === "loading") return;


// allow public routes
const isPublicRoute =
  PUBLIC_ROUTES.includes(pathname) ||
  /^\/[^\/]+$/.test(pathname); // matches /username

if (isPublicRoute) return;

// if not logged in → redirect login
if (!session?.user) {
  router.replace("/login");
  return;
}

const role = session.user.role; // 1=user, 2=creator

const roleKey = role === 1 ? "user" : role === 2 ? "creator" : null;

if (!roleKey) {
  router.replace("/login");
  return;
}

const allowedRoutes = ROLE_ROUTES[roleKey];

const isAllowed = allowedRoutes.some((route) =>
  pathname.startsWith(route),
);

if (!isAllowed) {
  router.replace("/feed");
}


}, [session, status, pathname]);

return <>{children}</>;
}
