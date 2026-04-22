"use client";

import { useState, useTransition, useRef } from "react";
import { Pencil, Check, X } from "lucide-react";
import { updateBrandDescription } from "./actions";

export function BrandDescription({ brandId, description }: { brandId: string; description?: string | null }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(description ?? "");
  const [saved, setSaved] = useState(description ?? "");
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLTextAreaElement>(null);

  function handleEdit() {
    setEditing(true);
    setTimeout(() => ref.current?.focus(), 0);
  }

  function handleCancel() {
    setValue(saved);
    setEditing(false);
  }

  function handleSave() {
    startTransition(async () => {
      await updateBrandDescription(brandId, value);
      setSaved(value);
      setEditing(false);
    });
  }

  if (editing) {
    return (
      <div className="mt-2 flex items-start gap-2">
        <textarea
          ref={ref}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="업체 소개를 입력하세요 (주요 제품, 특징, 연혁 등)"
          rows={3}
          className="flex-1 bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-zinc-200 text-sm resize-none focus:outline-none focus:border-zinc-400"
        />
        <div className="flex flex-col gap-1 mt-0.5">
          <button
            onClick={handleSave}
            disabled={pending}
            className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center text-white hover:bg-emerald-500 disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCancel}
            className="w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-1.5 group flex items-start gap-2">
      {saved ? (
        <p className="text-zinc-400 text-sm leading-relaxed flex-1">{saved}</p>
      ) : (
        <p className="text-zinc-600 text-sm italic flex-1">업체 설명을 추가하세요...</p>
      )}
      <button
        onClick={handleEdit}
        className="opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 text-zinc-600 hover:text-zinc-300"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
