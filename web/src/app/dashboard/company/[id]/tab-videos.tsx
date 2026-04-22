"use client";

import { useState, useTransition } from "react";
import { Play, Plus, Trash2, X, ExternalLink, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addPromoVideo, deletePromoVideo } from "./actions";
import { SectionTitle } from "@/components/section-header";

interface PromoVideo {
  id: string;
  title: string;
  video_url: string;
  description?: string | null;
  created_at: string;
}

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function VideoThumbnail({ url, title }: { url: string; title: string }) {
  const ytId = getYouTubeId(url);
  if (ytId) {
    return <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={title} className="w-full h-full object-cover" />;
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
      <Play className="w-10 h-10 text-zinc-600" />
    </div>
  );
}

export function TabVideos({ brandId, videos }: { brandId: string; videos: PromoVideo[] }) {
  const [adding, setAdding] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionTitle title={`홍보영상 (${videos.length})`} icon={Video} color="orange" />
        <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-500 gap-1" onClick={() => setAdding(true)}>
          <Plus className="w-3.5 h-3.5" /> 영상 추가
        </Button>
      </div>

      {adding && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium text-sm">홍보영상 추가</h3>
            <button onClick={() => setAdding(false)} className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <form
            action={(fd) => {
              startTransition(async () => {
                await addPromoVideo(brandId, fd);
                setAdding(false);
              });
            }}
            className="space-y-3"
          >
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs">제목 *</Label>
              <Input name="title" placeholder="예: 2026 S/S 컬렉션 홍보영상" required
                className="bg-zinc-800 border-zinc-700 text-white text-sm h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs">영상 URL * (YouTube, Vimeo 등)</Label>
              <Input name="video_url" type="url" placeholder="https://youtube.com/watch?v=..." required
                className="bg-zinc-800 border-zinc-700 text-white text-sm h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs">설명</Label>
              <Input name="description" placeholder="영상 설명 (선택)"
                className="bg-zinc-800 border-zinc-700 text-white text-sm h-9" />
            </div>
            <Button type="submit" disabled={pending} size="sm" className="bg-emerald-600 text-white hover:bg-emerald-500 w-full">
              {pending ? "저장 중..." : "저장"}
            </Button>
          </form>
        </div>
      )}

      {videos.length === 0 ? (
        <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center">
          <Play className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-white font-medium mb-1">등록된 홍보영상이 없습니다</p>
          <p className="text-zinc-500 text-sm">YouTube, Vimeo 등 영상 URL을 등록하세요</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map(v => (
            <div key={v.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group">
              <div className="w-full h-44 relative overflow-hidden">
                <VideoThumbnail url={v.video_url} title={v.title} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <a href={v.video_url} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-5 h-5 text-zinc-950 ml-0.5" />
                  </a>
                </div>
                <form
                  action={deletePromoVideo.bind(null, v.id, brandId)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button type="submit"
                    className="w-7 h-7 rounded-full bg-zinc-900/80 flex items-center justify-center text-zinc-400 hover:text-red-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-white text-sm font-medium leading-tight">{v.title}</p>
                  <a href={v.video_url} target="_blank" rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-zinc-300 shrink-0 mt-0.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                {v.description && <p className="text-zinc-500 text-xs mt-1">{v.description}</p>}
                <p className="text-zinc-600 text-xs mt-2">{new Date(v.created_at).toLocaleDateString("ko-KR")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
