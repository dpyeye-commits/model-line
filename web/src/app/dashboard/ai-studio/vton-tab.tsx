"use client";

import { useState } from "react";
import { Sparkles, Download, Loader2 } from "lucide-react";

const CATEGORIES = [
  { value: "Upper-body", label: "상의 (Upper-body)" },
  { value: "Lower-body", label: "하의 (Lower-body)" },
  { value: "Dress",      label: "원피스 (Dress)" },
];

export function VTONTab() {
  const [garmentUrl, setGarmentUrl] = useState("");
  const [modelUrl, setModelUrl]     = useState("");
  const [category, setCategory]     = useState("Upper-body");
  const [steps, setSteps]           = useState(20);
  const [result, setResult]         = useState<string | null>(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  async function run() {
    if (!garmentUrl || !modelUrl) {
      setError("의상 이미지 URL과 모델 이미지 URL을 모두 입력해주세요.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ai/vton", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ garmentImageUrl: garmentUrl, modelImageUrl: modelUrl, category, steps }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.output);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-amber-400 to-orange-400" />
        <div>
          <h3 className="text-white font-bold text-base">OOTDiffusion 가상 피팅</h3>
          <p className="text-zinc-500 text-xs">의상 이미지 + 모델 사진 → 상/하의·원피스 가상 피팅</p>
        </div>
      </div>

      {/* 카테고리 */}
      <div className="flex gap-2 mb-5 mt-4">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setCategory(value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              category === value
                ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                : "bg-zinc-800 border-zinc-700 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-zinc-400 text-xs font-medium mb-1.5 block">의상 이미지 URL</label>
          <input
            type="url"
            value={garmentUrl}
            onChange={(e) => setGarmentUrl(e.target.value)}
            placeholder="https://example.com/garment.jpg"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-500/50"
          />
          {garmentUrl && (
            <img src={garmentUrl} alt="garment" className="mt-2 w-full h-40 object-contain rounded-lg bg-zinc-800 border border-zinc-700" />
          )}
        </div>
        <div>
          <label className="text-zinc-400 text-xs font-medium mb-1.5 block">모델 이미지 URL</label>
          <input
            type="url"
            value={modelUrl}
            onChange={(e) => setModelUrl(e.target.value)}
            placeholder="https://example.com/model.jpg"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-500/50"
          />
          {modelUrl && (
            <img src={modelUrl} alt="model" className="mt-2 w-full h-40 object-contain rounded-lg bg-zinc-800 border border-zinc-700" />
          )}
        </div>
      </div>

      <div className="mb-5">
        <label className="text-zinc-400 text-xs font-medium mb-1.5 block">
          생성 단계 (Steps): <span className="text-amber-300">{steps}</span>
        </label>
        <input
          type="range" min={20} max={40} value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
          className="w-full accent-amber-500"
        />
        <div className="flex justify-between text-zinc-600 text-xs mt-1">
          <span>20 (빠름)</span><span>40 (고품질)</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
      )}

      <button
        onClick={run}
        disabled={loading}
        className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "처리 중... (약 1-2분 소요)" : "가상 피팅 실행"}
      </button>

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-zinc-300 text-sm font-medium">피팅 결과</p>
            <a
              href={result} download="ootd-result.png" target="_blank"
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> 다운로드
            </a>
          </div>
          <img src={result} alt="OOTD result" className="max-w-sm rounded-2xl border border-zinc-700 shadow-xl" />
        </div>
      )}
    </div>
  );
}
