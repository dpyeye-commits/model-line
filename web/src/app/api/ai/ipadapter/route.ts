import { NextRequest, NextResponse } from "next/server";
import { pollinationsImage } from "../pollinations";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const output = await pollinationsImage(
      [
        prompt || "a fashion model wearing this outfit, white studio background, full body shot",
        "high fashion photography, professional lighting, detailed fabric texture",
      ].join(", "),
      {
        width: "768",
        height: "1024",
        negative: "distorted, blurry, ugly, poorly fitting, low quality",
      }
    );
    return NextResponse.json({ output });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
