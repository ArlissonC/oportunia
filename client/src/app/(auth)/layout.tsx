"use client";

import QueryProvider from "@/providers/QueryProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-12">
        <QueryProvider>{children}</QueryProvider>
      </main>
    </>
  );
}
