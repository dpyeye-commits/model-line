"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/image-upload";
import { uploadProductImage } from "../../upload-actions";

interface Props {
  productId: string;
  lineId: string;
  currentUrl?: string | null;
}

export function ProductImageUpload({ productId, lineId, currentUrl }: Props) {
  const [url, setUrl] = useState<string | null>(currentUrl ?? null);

  async function handleUpload(fd: FormData): Promise<string> {
    const uploaded = await uploadProductImage(productId, lineId, fd);
    setUrl(uploaded);
    return uploaded;
  }

  return (
    <ImageUpload
      currentUrl={url}
      onUpload={handleUpload}
      hint="JPG, PNG (최대 10MB)"
      aspect="square"
    />
  );
}
