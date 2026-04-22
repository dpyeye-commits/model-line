"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/image-upload";
import { uploadFabricImage } from "../../upload-actions";
import { CheckCircle2 } from "lucide-react";

interface Props {
  fabricId: string;
  field: string;
  label: string;
  hint: string;
  currentUrl: string | null;
}

export function FabricMapSection({ fabricId, field, label, hint, currentUrl }: Props) {
  const [url, setUrl] = useState<string | null>(currentUrl);

  async function handleUpload(fd: FormData): Promise<string> {
    const uploaded = await uploadFabricImage(fabricId, field, fd);
    setUrl(uploaded);
    return uploaded;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <p className="text-zinc-300 text-xs font-medium">{label}</p>
        {url && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
      </div>
      <ImageUpload
        currentUrl={url}
        onUpload={handleUpload}
        hint={hint}
        aspect="square"
      />
    </div>
  );
}
