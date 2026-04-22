"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  currentUrl?: string | null;
  onUpload: (formData: FormData) => Promise<string>;
  label?: string;
  hint?: string;
  aspect?: "square" | "wide";
}

export function ImageUpload({ currentUrl, onUpload, label, hint, aspect = "square" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const url = await onUpload(fd);
      setPreview(url);
    } catch (err: any) {
      setError(err.message ?? "업로드 실패");
    } finally {
      setLoading(false);
    }
  }

  const heightClass = aspect === "wide" ? "h-40" : "h-32";

  return (
    <div className="space-y-2">
      {label && <p className="text-zinc-300 text-sm font-medium">{label}</p>}
      <div
        className={`relative border-2 border-dashed border-zinc-700 rounded-xl ${heightClass} flex items-center justify-center overflow-hidden cursor-pointer hover:border-zinc-500 transition-colors`}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <>
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-xs">클릭하여 변경</p>
            </div>
          </>
        ) : (
          <div className="text-center">
            {loading ? (
              <Loader2 className="w-6 h-6 text-zinc-400 mx-auto animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-zinc-500 mx-auto mb-1" />
                <p className="text-zinc-400 text-xs">클릭하여 업로드</p>
                {hint && <p className="text-zinc-600 text-xs mt-0.5">{hint}</p>}
              </>
            )}
          </div>
        )}
        {loading && preview && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
}
