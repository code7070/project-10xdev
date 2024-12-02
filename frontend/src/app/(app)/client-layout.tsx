"use client";

import ProfileBadge from "@/components/profile-badge";
import { AuthContext } from "@/services/useAuth";
import { useContext } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useContext(AuthContext);
  return (
    <div className="flex-1 flex flex-col gap-6">
      <ProfileBadge {...auth} />
      {children}
    </div>
  );
}
