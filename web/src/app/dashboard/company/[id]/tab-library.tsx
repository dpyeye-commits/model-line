"use client";

import { useState, useTransition } from "react";
import { FolderOpen, Plus, Trash2, X, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadCompanyFile, deleteCompanyFile } from "./actions";
import { SectionTitle } from "@/components/section-header";

const FILE_TYPES = [
  { value: "catalog",     label: "카탈로그" },
  { value: "brochure",    label: "브로슈어" },
  { value: "certificate", label: "인증서" },
  { value: "pricelist",   label: "가격표" },
  { value: "other",       label: "기타" },
];

const typeLabel: Record<string, string> = Object.fromEntries(FILE_TYPES.map(t => [t.value, t.label]));
const typeBadge: Record<string, string> = {
  catalog:     "bg-blue-500/15 text-blue-400",
  brochure:    "bg-violet-500/15 text-violet-400",
  certificate: "bg-green-500/15 text-green-400",
  pricelist:   "bg-amber-500/15 text-amber-400",
  other:       "bg-zinc-800 text-zinc-400",
};

interface CompanyFile {
  id: string;
  name: string;
  file_url: string;
  file_type: string;
  created_at: string;
}

export function TabLibrary({ brandId, files }: { brandId: string; files: CompanyFile[] }) {
  const [adding, setAdding] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionTitle title={`회사 라이브러리 (${files.length})`} icon={FolderOpen} color="amber" />
        <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-500 gap-1" onClick={() => setAdding(true)}>
          <Plus className="w-3.5 h-3.5" /> 파일 업로드
        </Button>
      </div>

      {adding && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium text-sm">파일 업로드</h3>
            <button onClick={() => setAdding(false)} className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <form
            action={(fd) => {
              startTransition(async () => {
                await uploadCompanyFile(brandId, fd);
                setAdding(false);
              });
            }}
            className="space-y-3"
          >
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs">파일 *</Label>
              <input name="file" type="file" required
                className="text-zinc-300 text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-zinc-700 file:text-zinc-200 file:text-xs cursor-pointer" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-xs">파일명</Label>
                <Input name="name" placeholder="자동으로 파일명 사용" className="bg-zinc-800 border-zinc-700 text-white text-sm h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-xs">유형</Label>
                <select name="file_type" className="w-full rounded-md bg-zinc-800 border border-zinc-700 text-white px-3 py-2 text-sm h-9">
                  {FILE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
            </div>
            <Button type="submit" disabled={pending} size="sm" className="bg-emerald-600 text-white hover:bg-emerald-500 w-full">
              {pending ? "업로드 중..." : "업로드"}
            </Button>
          </form>
        </div>
      )}

      {files.length === 0 ? (
        <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center">
          <FolderOpen className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-white font-medium mb-1">등록된 파일이 없습니다</p>
          <p className="text-zinc-500 text-sm">카탈로그, 브로슈어, 인증서 등을 업로드하세요</p>
        </div>
      ) : (
        <div className="space-y-2">
          {files.map(f => (
            <div key={f.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{f.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${typeBadge[f.file_type] ?? typeBadge.other}`}>
                    {typeLabel[f.file_type] ?? f.file_type}
                  </span>
                  <span className="text-zinc-600 text-xs">{new Date(f.created_at).toLocaleDateString("ko-KR")}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={f.file_url} target="_blank" rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white">
                  <Download className="w-4 h-4" />
                </a>
                <form action={deleteCompanyFile.bind(null, f.id, brandId)}>
                  <button type="submit" className="text-zinc-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
