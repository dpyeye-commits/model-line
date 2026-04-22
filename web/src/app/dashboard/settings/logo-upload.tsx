"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/image-upload";
import { uploadBrandLogo } from "../upload-actions";

interface Props {
  brandId: string;
  currentLogoUrl?: string | null;
}

export function LogoUpload({ brandId, currentLogoUrl }: Props) {
  const [url, setUrl] = useState<string | null>(currentLogoUrl ?? null);

  async function handleUpload(fd: FormData): Promise<string> {
    const uploaded = await uploadBrandLogo(brandId, fd);
    setUrl(uploaded);
    return uploaded;
  }

  return (
    <ImageUpload
      currentUrl={url}
      onUpload={handleUpload}
      label="브랜드 로고"
      hint="PNG, JPG, SVG (최대 2MB)"
      aspect="wide"
    />
  );
}
