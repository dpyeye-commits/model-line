import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: NextRequest) {
  try {
    const { garmentImageUrl, modelImageUrl, category, steps, scale, seed } = await req.json();

    if (!garmentImageUrl || !modelImageUrl) {
      return NextResponse.json({ error: "이미지를 모두 입력해주세요." }, { status: 400 });
    }

    const [garmentRes, modelRes] = await Promise.all([
      fetch(garmentImageUrl),
      fetch(modelImageUrl),
    ]);
    if (!garmentRes.ok || !modelRes.ok) {
      throw new Error("이미지를 불러올 수 없습니다.");
    }

    const garmentBlob = await garmentRes.blob();
    const modelBlob = await modelRes.blob();

    // OOTDiffusion HF Space — 무료, 상/하/전신 카테고리 지원
    const client = await Client.connect("levihsu/OOTDiffusion");

    const cat = category || "Upper-body"; // "Upper-body" | "Lower-body" | "Dress"
    const result = await client.predict("/process_dc", [
      modelBlob,
      garmentBlob,
      cat,
      1,              // n_samples
      steps || 20,    // n_steps
      scale || 2.0,   // image_scale (guidance)
      seed ?? -1,
    ]);

    const data = result.data as any[];
    const img = data[0];

    // OOTDiffusion 반환 형식: {image: {path, url}} 또는 직접 URL
    let url: string;
    if (typeof img === "string") {
      url = img;
    } else if (img?.image?.url) {
      url = img.image.url;
    } else if (img?.image?.path) {
      url = `https://levihsu-ootdiffusion.hf.space/file=${img.image.path}`;
    } else if (Array.isArray(img)) {
      const first = img[0];
      url = first?.image?.url ?? first?.url ?? first;
    } else {
      url = img?.url ?? img;
    }

    return NextResponse.json({ output: url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
