"use client";

import { useState } from "react";
import { Sliders, Download, Loader2 } from "lucide-react";

export function ControlNetTab() {
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("fashion model wearing elegant clothes, studio lighting");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (!imageUrl.trim()) {
      setError("참조 이미지 URL을 입력해주세요.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ai/controlnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, prompt }),
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
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-400" />
        <div>
          <h3 className="text-white font-bold text-base">ControlNet 포즈 제어</h3>
          <p className="text-zinc-500 text-xs">참조 이미지의 포즈·윤곽선을 고정하여 새 이미지를 생성합니다</p>
        </div>
      </div>

      <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl px-4 py-3 mb-5">
        <p className="text-cyan-300 text-xs font-medium mb-1">작동 방식</p>
        <p className="text-zinc-400 text-xs leading-relaxed">
          입력 이미지에서 가장자리(Canny Edge)를 추출하고, 그 형태를 유지하면서 프롬프트에 맞는 새로운 이미지를 생성합니다. 의상 실루엣을 고정하는 데 효과적입니다.
        </p>
      </div>

      <div className="mb-4">
        <label className="text-zinc-400 text-xs font-medium mb-1.5 block">참조 이미지 URL (포즈/형태 추출용)</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/reference.jpg"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50"
        />
        {imageUrl && (
          <img src={imageUrl} alt="reference preview" className="mt-2 w-48 h-40 object-contain rounded-lg bg-zinc-800 border border-zinc-700" />
        )}
      </div>

      <div className="mb-5">
        <label className="text-zinc-400 text-xs font-medium mb-1.5 block">생성 프롬프트</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 resize-none"
        />
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
      )}

      <button
        onClick={run}
        disabled={loading}
        className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sliders className="w-4 h-4" />}
        {loading ? "처리 중... (약 30-60초 소요)" : "포즈 제어 실행"}
      </button>

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-zinc-300 text-sm font-medium">생성 결과</p>
            <a
              href={result}
              download="controlnet-result.png"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> 다운로드
            </a>
          </div>
          <img src={result} alt="ControlNet result" className="max-w-sm rounded-2xl border border-zinc-700 shadow-xl" />
        </div>
      )}
    </div>
  );
}
