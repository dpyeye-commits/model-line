import { NextRequest, NextResponse } from "next/server";
import { pollinationsImage } from "../pollinations";

export async function POST(req: NextRequest) {
  try {
    const { prompt, negativePrompt, width, height, seed } = await req.json();
    const output = await pollinationsImage(
      prompt || "fashion clothing product photo, white background, high quality",
      {
        width: String(width || 768),
        height: String(height || 1024),
        ...(seed !== undefined && { seed: String(seed) }),
        ...(negativePrompt && { negative: negativePrompt }),
      }
    );
    return NextResponse.json({ output });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
