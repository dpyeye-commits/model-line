import { NextRequest, NextResponse } from "next/server";
import { pollinationsImage } from "../pollinations";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const output = await pollinationsImage(
      [
        prompt || "fashion model wearing elegant clothes, studio lighting",
        "controlled pose, sharp silhouette, best quality, extremely detailed",
      ].join(", "),
      {
        width: "512",
        height: "768",
        negative: "lowres, bad anatomy, bad hands, missing fingers, blurry",
      }
    );
    return NextResponse.json({ output });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
