export async function pollinationsImage(
  prompt: string,
  params: Record<string, string> = {},
  retries = 3
): Promise<string> {
  const defaultParams: Record<string, string> = {
    model: "flux",
    nologo: "true",
    seed: String(Math.floor(Math.random() * 99999)),
    width: "768",
    height: "1024",
    ...params,
  };

  const qs = new URLSearchParams(defaultParams).toString();
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${qs}`;

  for (let i = 0; i < retries; i++) {
    if (i > 0) await new Promise((r) => setTimeout(r, 3000 * i));

    const res = await fetch(url, { cache: "no-store" });

    if (res.status === 429) {
      if (i === retries - 1) throw new Error("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
      continue;
    }
    if (!res.ok) throw new Error(`이미지 생성 실패 (${res.status})`);

    const buffer = Buffer.from(await res.arrayBuffer());
    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
  }

  throw new Error("이미지 생성에 실패했습니다.");
}
