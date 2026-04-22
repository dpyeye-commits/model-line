"use client";

import { useState } from "react";
import { Sparkles, Sliders, Image, Cpu, Box } from "lucide-react";
import { VTONTab } from "./vton-tab";
import { SDXLTab } from "./sdxl-tab";
import { ControlNetTab } from "./controlnet-tab";
import { IPAdapterTab } from "./ipadapter-tab";

const TABS = [
  { key: "vton",       label: "가상 피팅",       icon: Sparkles, color: "amber" },
  { key: "sdxl",       label: "이미지 생성",      icon: Cpu,      color: "violet" },
  { key: "controlnet", label: "포즈 제어",         icon: Sliders,  color: "cyan" },
  { key: "ipadapter",  label: "레퍼런스 피팅",     icon: Image,    color: "pink" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const colorMap = {
  amber:  { active: "bg-amber-500/15 border-amber-500/40 text-amber-300",  icon: "text-amber-400",  dot: "bg-amber-400" },
  violet: { active: "bg-violet-500/15 border-violet-500/40 text-violet-300", icon: "text-violet-400", dot: "bg-violet-400" },
  cyan:   { active: "bg-cyan-500/15 border-cyan-500/40 text-cyan-300",     icon: "text-cyan-400",   dot: "bg-cyan-400" },
  pink:   { active: "bg-pink-500/15 border-pink-500/40 text-pink-300",     icon: "text-pink-400",   dot: "bg-pink-400" },
};

export function AIStudioTabs() {
  const [tab, setTab] = useState<TabKey>("vton");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-2 mb-6">
        {TABS.map(({ key, label, icon: Icon, color }) => {
          const c = colorMap[color];
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                active
                  ? `${c.active}`
                  : "bg-zinc-900 border-zinc-700/50 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? c.icon : "text-zinc-600"}`} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        {tab === "vton"       && <VTONTab />}
        {tab === "sdxl"       && <SDXLTab />}
        {tab === "controlnet" && <ControlNetTab />}
        {tab === "ipadapter"  && <IPAdapterTab />}
      </div>
    </div>
  );
}
