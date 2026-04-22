"use client";

import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

export interface BannerAd {
  id: string;
  company: string;
  image_url?: string | null;
  link_url?: string | null;
  bg_color?: string | null;
}

const PLACEHOLDER_ADS: BannerAd[] = [
  { id: "p1", company: "참여 업체 광고 1", bg_color: "#1e293b" },
  { id: "p2", company: "참여 업체 광고 2", bg_color: "#1e1b4b" },
  { id: "p3", company: "참여 업체 광고 3", bg_color: "#0f2417" },
  { id: "p4", company: "참여 업체 광고 4", bg_color: "#1c1917" },
  { id: "p5", company: "참여 업체 광고 5", bg_color: "#1e293b" },
  { id: "p6", company: "참여 업체 광고 6", bg_color: "#1a1035" },
];

function BannerCard({ ad }: { ad: BannerAd }) {
  const content = (
    <div
      className="relative w-48 h-20 rounded-xl overflow-hidden border border-white/8 flex-shrink-0 group cursor-pointer hover:border-white/20 transition-all duration-200 hover:scale-[1.02]"
      style={{ backgroundColor: ad.bg_color ?? "#18181b" }}
    >
      {ad.image_url ? (
        <img src={ad.image_url} alt={ad.company} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-3">
          <span className="text-zinc-400 text-xs font-medium text-center leading-tight">{ad.company}</span>
          <span className="text-zinc-600 text-[10px]">광고 문의</span>
        </div>
      )}
      {ad.link_url && (
        <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-3 h-3 text-white/60" />
        </div>
      )}
    </div>
  );

  return ad.link_url ? (
    <a href={ad.link_url} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : (
    <div>{content}</div>
  );
}

export function BottomBanner({ ads }: { ads?: BannerAd[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = ads && ads.length > 0 ? ads : PLACEHOLDER_ADS;
  // 무한 루프를 위해 3배 복제
  const repeated = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame: number;
    let x = 0;
    const speed = 0.4;
    const singleWidth = track.scrollWidth / 3;

    function tick() {
      x += speed;
      if (x >= singleWidth) x -= singleWidth;
      track!.style.transform = `translateX(-${x}px)`;
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [items.length]);

  return (
    <div className="border-t border-white/5 bg-zinc-950/90 backdrop-blur-sm">
      {/* 헤더 */}
      <div className="max-w-6xl mx-auto px-8 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-gradient-to-b from-amber-400 to-orange-400" />
          <span className="text-zinc-400 text-xs font-medium">참여 업체 · 광고</span>
        </div>
        <span className="text-zinc-600 text-[10px]">광고 문의 031-850-3651</span>
      </div>

      {/* 마퀴 */}
      <div className="overflow-hidden py-3 px-0">
        <div ref={trackRef} className="flex gap-3 will-change-transform" style={{ width: "max-content" }}>
          {repeated.map((ad, i) => (
            <BannerCard key={`${ad.id}-${i}`} ad={ad} />
          ))}
        </div>
      </div>
    </div>
  );
}
