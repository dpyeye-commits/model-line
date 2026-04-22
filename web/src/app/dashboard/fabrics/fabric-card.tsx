"use client";

import { useState } from "react";
import { Shirt, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";
import { uploadFabricSwatch } from "../upload-actions";
import { deleteFabric } from "../actions";

interface FabricCardProps {
  fabric: {
    id: string;
    name: string;
    composition?: string | null;
    weight?: string | null;
    finish?: string | null;
    swatch_url?: string | null;
  };
}

export function FabricCard({ fabric }: FabricCardProps) {
  const [swatchUrl, setSwatchUrl] = useState<string | null>(fabric.swatch_url ?? null);

  async function handleUpload(fd: FormData): Promise<string> {
    const url = await uploadFabricSwatch(fabric.id, fd);
    setSwatchUrl(url);
    return url;
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors group">
      <ImageUpload
        currentUrl={swatchUrl}
        onUpload={handleUpload}
        hint="JPG, PNG"
        aspect="wide"
      />
      <div className="mt-3 flex items-start justify-between">
        <div>
          <h3 className="text-white font-medium">{fabric.name}</h3>
          <div className="mt-1.5 space-y-0.5">
            {fabric.composition && <p className="text-zinc-400 text-xs">혼방률: {fabric.composition}</p>}
            {fabric.weight && <p className="text-zinc-400 text-xs">중량: {fabric.weight} g/m²</p>}
            {fabric.finish && <p className="text-zinc-400 text-xs">가공: {fabric.finish}</p>}
          </div>
        </div>
        <form action={deleteFabric.bind(null, fabric.id)}>
          <button type="submit" className="text-zinc-600 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100">
            <Trash2 className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
