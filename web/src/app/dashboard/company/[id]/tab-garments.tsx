"use client";

import { useState, useTransition } from "react";
import { Shirt, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addGarmentModel, deleteGarmentModel } from "./actions";
import { SectionTitle } from "@/components/section-header";

interface GarmentModel {
  id: string;
  name: string;
  description?: string | null;
  image_url?: string | null;
}

export function TabGarments({ brandId, models }: { brandId: string; models: GarmentModel[] }) {
  const [adding, setAdding] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionTitle title={`의상 모델링 (${models.length})`} icon={Shirt} color="pink" />
        <Button
          size="sm"
          className="bg-emerald-600 text-white hover:bg-emerald-500 gap-1"
          onClick={() => setAdding(true)}
        >
          <Plus className="w-3.5 h-3.5" /> 추가
        </Button>
      </div>

      {adding && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium text-sm">의상 모델링 추가</h3>
            <button onClick={() => setAdding(false)} className="text-zinc-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <form
            action={(fd) => {
              startTransition(async () => {
                await addGarmentModel(brandId, fd);
                setAdding(false);
              });
            }}
            className="space-y-3"
          >
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs">의상명 *</Label>
              <Input name="name" placeholder="예: 2026 S/S 재킷" required
                className="bg-zinc-800 border-zinc-700 text-white text-sm h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs">설명</Label>
              <Input name="description" placeholder="소재, 스타일, 특징 등"
                className="bg-zinc-800 border-zinc-700 text-white text-sm h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs">이미지</Label>
              <input name="image" type="file" accept="image/*"
                className="text-zinc-300 text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-zinc-700 file:text-zinc-200 file:text-xs cursor-pointer" />
            </div>
            <Button type="submit" disabled={pending} size="sm"
              className="bg-emerald-600 text-white hover:bg-emerald-500 w-full">
              {pending ? "저장 중..." : "저장"}
            </Button>
          </form>
        </div>
      )}

      {models.length === 0 ? (
        <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center">
          <Shirt className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-white font-medium mb-1">등록된 의상 모델링이 없습니다</p>
          <p className="text-zinc-500 text-sm">2안(plan_b) 업체의 의상 3D 모델링 결과물을 등록하세요</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {models.map(m => (
            <div key={m.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group">
              <div className="w-full h-40 bg-zinc-800 flex items-center justify-center relative">
                {m.image_url ? (
                  <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <Shirt className="w-10 h-10 text-zinc-600" />
                )}
                <form
                  action={deleteGarmentModel.bind(null, m.id, brandId)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button type="submit"
                    className="w-7 h-7 rounded-full bg-zinc-900/80 flex items-center justify-center text-zinc-400 hover:text-red-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium">{m.name}</p>
                {m.description && <p className="text-zinc-500 text-xs mt-0.5">{m.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
