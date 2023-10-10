"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function Layout({
  children,
  session
}: any) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}