"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/authActions";

/**
 * Logout button that calls the `logout` Server Action (clears the auth_token
 * cookie) and then re-validates the messages page so the login form returns.
 * Mirrors the programmatic Server Action pattern used in the Contact section.
 */
export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-wait disabled:opacity-60"
    >
      {loading ? "Logging out…" : "Logout"}
    </button>
  );
}
