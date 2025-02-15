"use client";
import { ReactNode } from "react";
import { ProfileCreateProvider } from "@/src/app/profiles/create/_model/context";

export default function ProfileCreateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProfileCreateProvider>
      <div className="w-full p-6">{children}</div>
    </ProfileCreateProvider>
  );
}
