"use client";

import { useState } from "react";
import { Image, Download, Loader2 } from "lucide-react";

export function IPAdapterTab() {
  const [garmentUrl, setGarmentUrl] = useState("");
  const [prompt, setPrompt] = useState("a fashion model wearing this outfit, white studio background, full body shot");
  const [scale, setScale] = useState(0.8);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (!garmentUrl.trim()) {
      setError("의상 이미지 URL을 입력해주세요.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ai/ipadapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ garmentImageUrl: garmentUrl, prompt, scale }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const url = Array.isArray(data.output) ? data.output[0] : data.output;
      setResult(url);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-pink-400 to-rose-400" />
        <div>
          <h3 className="text-white font-bold text-base">IP-Adapter 레퍼런스 피팅</h3>
          <p className="text-zinc-500 text-xs">의상 이미지를 참조하여 모델 착용 이미지를 생성합니다</p>
        </div>
      </div>

      <div className="bg-pink-500/5 border border-pink-500/20 rounded-xl px-4 py-3 mb-5">
        <p className="text-pink-300 text-xs font-medium mb-1">IDM-VTON과의 차이</p>
        <p className="text-zinc-400 text-xs leading-relaxed">
          IDM-VTON은 실제 모델 사진이 필요하지만, IP-Adapter는 의상 이미지만으로 모델 착용 이미지를 만들 수 있습니다. 모델 사진이 없을 때 활용하세요.
        </p>
      </div>

      <div className="mb-4">
        <label className="text-zinc-400 text-xs font-medium mb-1.5 block">의상 이미지 URL (참조용)</label>
        <input
          type="url"
          value={garmentUrl}
          onChange={(e) => setGarmentUrl(e.target.value)}
          placeholder="https://example.com/garment.jpg"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-pink-500/50"
        />
        {garmentUrl && (
          <img src={garmentUrl} alt="garment preview" className="mt-2 w-48 h-40 object-contain rounded-lg bg-zinc-800 border border-zinc-700" />
        )}
      </div>

      <div className="mb-4">
        <label className="text-zinc-400 text-xs font-medium mb-1.5 block">생성 프롬프트</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-pink-500/50 resize-none"
        />
      </div>

      <div className="mb-5">
        <label className="text-zinc-400 text-xs font-medium mb-1.5 block">
          의상 반영 강도 (Scale): <span className="text-pink-300">{scale.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min={0.3} max={1.0} step={0.1} value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="w-full accent-pink-500"
        />
        <div className="flex justify-between text-zinc-600 text-xs mt-1">
          <span>0.3 (자유롭게)</span><span>1.0 (의상 고정)</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
      )}

      <button
        onClick={run}
        disabled={loading}
        className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
        {loading ? "처리 중... (약 30-60초 소요)" : "레퍼런스 피팅 실행"}
      </button>

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-zinc-300 text-sm font-medium">생성 결과</p>
            <a
              href={result}
              download="ipadapter-result.png"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-pink-400 hover:text-pink-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> 다운로드
            </a>
          </div>
          <img src={result} alt="IP-Adapter result" className="max-w-sm rounded-2xl border border-zinc-700 shadow-xl" />
        </div>
      )}
    </div>
  );
}
