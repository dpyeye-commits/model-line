"use client";

import { useState } from "react";
import { Cpu, Download, Loader2 } from "lucide-react";

export function SDXLTab() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("blurry, low quality, distorted");
  const [steps, setSteps] = useState(30);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (!prompt.trim()) {
      setError("프롬프트를 입력해주세요.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, negativePrompt, steps, width: 768, height: 1024 }),
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
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-violet-400 to-purple-400" />
        <div>
          <h3 className="text-white font-bold text-base">Stable Diffusion XL 이미지 생성</h3>
          <p className="text-zinc-500 text-xs">텍스트 설명으로 의상 제품 이미지를 생성합니다</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-zinc-400 text-xs font-medium mb-1.5 block">프롬프트</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder="예: white linen oversized shirt, fashion product photo, clean white background, high quality"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 resize-none"
        />
      </div>

      <div className="mb-4">
        <label className="text-zinc-400 text-xs font-medium mb-1.5 block">네거티브 프롬프트</label>
        <input
          type="text"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50"
        />
      </div>

      <div className="mb-5">
        <label className="text-zinc-400 text-xs font-medium mb-1.5 block">
          생성 단계 (Steps): <span className="text-violet-300">{steps}</span>
        </label>
        <input
          type="range"
          min={20} max={50} value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
          className="w-full accent-violet-500"
        />
        <div className="flex justify-between text-zinc-600 text-xs mt-1">
          <span>20 (빠름)</span><span>50 (고품질)</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
      )}

      <button
        onClick={run}
        disabled={loading}
        className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
        {loading ? "생성 중... (약 30-60초 소요)" : "이미지 생성"}
      </button>

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-zinc-300 text-sm font-medium">생성 결과</p>
            <a
              href={result}
              download="sdxl-result.png"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> 다운로드
            </a>
          </div>
          <img src={result} alt="SDXL result" className="max-w-sm rounded-2xl border border-zinc-700 shadow-xl" />
        </div>
      )}
    </div>
  );
}
