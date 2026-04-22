"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/image-upload";
import Link from "next/link";

interface Props {
  error?: string;
  createFabric: (formData: FormData) => Promise<void>;
}

export function FabricNewForm({ error, createFabric }: Props) {
  const [swatchUrl, setSwatchUrl] = useState<string | null>(null);

  // 업로드는 저장 후에 하므로 여기선 임시 미리보기만
  async function handleSwatchUpload(fd: FormData): Promise<string> {
    const file = fd.get("file") as File;
    return URL.createObjectURL(file);
  }

  return (
    <form action={createFabric} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <ImageUpload
          label="스와치 이미지"
          hint="JPG, PNG (최대 10MB)"
          onUpload={handleSwatchUpload}
          aspect="square"
        />
        <ImageUpload
          label="디지털 맵 파일"
          hint="PNG, PSD, TIF"
          onUpload={handleSwatchUpload}
          aspect="square"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-300">소재명 *</Label>
        <Input name="name" placeholder="예: 면 혼방 트윌" required className="bg-zinc-900 border-zinc-700 text-white" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-zinc-300">혼방률</Label>
          <Input name="composition" placeholder="면 80%, 폴리 20%" className="bg-zinc-900 border-zinc-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-zinc-300">중량 (g/m²)</Label>
          <Input name="weight" placeholder="180" type="number" className="bg-zinc-900 border-zinc-700 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-zinc-300">폭 (cm)</Label>
          <Input name="width" placeholder="150" type="number" className="bg-zinc-900 border-zinc-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-zinc-300">가공 방식</Label>
          <select name="finish" className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
            <option value="">선택</option>
            <option>일반</option>
            <option>발수 가공</option>
            <option>방염 가공</option>
            <option>항균 가공</option>
            <option>스트레치</option>
            <option>워싱</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="bg-white text-zinc-950 hover:bg-zinc-100 flex-1">소재 저장</Button>
        <Link href="/dashboard/fabrics">
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white">취소</Button>
        </Link>
      </div>
    </form>
  );
}
