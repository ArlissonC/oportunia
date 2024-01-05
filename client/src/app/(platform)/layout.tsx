"use client";

import Navbar from "@/components/ui/Navbar";
import PrivateRoute from "@/components/PrivateRoute";
import QueryProvider from "@/providers/QueryProvider";
import { authorization } from "@/constants/authorization";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "@/services/auth";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    actions: { setAuthStore },
    state: { isUserLogged },
  } = useAuthStore();
  const pathname = usePathname();
  const isPrivate = authorization.checkIsPrivateRoute(pathname);

  useEffect(() => {
    (async () => {
      const me = await authService.me();
      if (!!me) {
        setAuthStore("isUserLogged", true);
        setAuthStore("isCandidate", me.roles[0] === "Candidate");
      }
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="px-4 pt-10 pb-4 mx-auto max-w-7xl">
        <QueryProvider>
          {isPrivate && isUserLogged && (
            <PrivateRoute pathname={pathname}>{children}</PrivateRoute>
          )}
          {!isPrivate && children}
        </QueryProvider>
      </main>
    </div>
  );
}
