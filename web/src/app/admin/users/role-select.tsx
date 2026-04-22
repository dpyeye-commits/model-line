"use client";

import { useTransition } from "react";
import { updateUserRole } from "../actions";

export function RoleSelect({ userId, role }: { userId: string; role: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={role}
      disabled={pending}
      onChange={e => {
        startTransition(() => updateUserRole(userId, e.target.value));
      }}
      className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded-md px-2 py-1 cursor-pointer disabled:opacity-50"
    >
      <option value="super_admin">슈퍼관리자</option>
      <option value="brand_admin">브랜드</option>
      <option value="agency_manager">에이전시</option>
    </select>
  );
}
