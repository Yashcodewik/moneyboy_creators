"use client";

import { useEffect, useState } from "react";
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

  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const ALL_ROLE_ROUTES = Object.values(ROLE_ROUTES).flat();

    const isUsernameRoute =
      /^\/[a-zA-Z0-9_]+$/.test(pathname) &&
      !PUBLIC_ROUTES.includes(pathname) &&
      !ALL_ROLE_ROUTES.includes(pathname);

    const isPublicRoute =
      PUBLIC_ROUTES.includes(pathname) ||
      isUsernameRoute;

    if (isPublicRoute) {
      setAllowed(true);
      return;
    }

    // not logged in
    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const role = session.user.role;
    const roleKey = role === 1 ? "user" : role === 2 ? "creator" : null;

    if (!roleKey) {
      router.replace("/login");
      return;
    }

    const allowedRoutes = ROLE_ROUTES[roleKey];

  const isDynamicMatch = allowedRoutes.some((route) => {
  if (route.includes("[publicId]")) {
    return pathname.startsWith("/userprofile/");
  }
  return route === pathname;
});

if (isDynamicMatch) {
  setAllowed(true);
} else {
  router.replace("/feed");
}
  }, [session, status, pathname, router]);

  // block render until verified
  if (!allowed) return null;

  return <>{children}</>;
}