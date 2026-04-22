import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Building2, ChevronRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

const MAP_FIELDS = [
  "swatch_url","color_map_url","normal_map_url","reflection_map_url",
  "transparency_map_url","draping_url","virtual_mapping_url",
];

const planLabel: Record<string, string> = { plan_a: "1안", plan_b: "2안" };

export default async function AdminBrandsPage() {
  const supabase = await createClient();

  const { data: brands } = await supabase
    .from("brands")
    .select(`id, name, description, content_plan, logo_url, created_at,
      fabrics(id, ${MAP_FIELDS.join(",")})`)
    .order("created_at", { ascending: true });

  const list = brands ?? [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <SectionHeader title="업체 관리" subtitle={`참여 업체 ${list.length}개사`} icon={Building2} color="emerald" />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left px-5 py-3 text-zinc-500 font-medium w-8">#</th>
              <th className="text-left px-5 py-3 text-zinc-500 font-medium">업체명</th>
              <th className="text-left px-5 py-3 text-zinc-500 font-medium">방안</th>
              <th className="text-left px-5 py-3 text-zinc-500 font-medium">소재</th>
              <th className="text-left px-5 py-3 text-zinc-500 font-medium">진행률</th>
              <th className="text-left px-5 py-3 text-zinc-500 font-medium">상태</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {list.map((brand: any, idx) => {
              const fabrics = brand.fabrics ?? [];
              const pct = fabrics.length === 0 ? 0 : Math.round(
                fabrics.reduce((s: number, f: any) => s + MAP_FIELDS.filter(k => f[k]).length / MAP_FIELDS.length, 0)
                / fabrics.length * 100
              );
              const StatusIcon = pct === 100 ? CheckCircle2 : pct > 0 ? Clock : AlertCircle;
              const statusColor = pct === 100 ? "text-green-400" : pct > 0 ? "text-amber-400" : "text-zinc-500";
              const statusLabel = pct === 100 ? "완료" : pct > 0 ? "진행중" : "미시작";

              return (
                <tr key={brand.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-5 py-3 text-zinc-600 font-mono text-xs">{String(idx+1).padStart(2,"0")}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 overflow-hidden">
                        {brand.logo_url
                          ? <img src={brand.logo_url} className="w-full h-full object-cover" alt="" />
                          : <Building2 className="w-3.5 h-3.5 text-zinc-500" />}
                      </div>
                      <div>
                        <p className="text-white font-medium">{brand.name}</p>
                        {brand.description && <p className="text-zinc-500 text-xs">{brand.description}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5 rounded-full border border-zinc-700">
                      {planLabel[brand.content_plan ?? "plan_a"]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-zinc-300">{fabrics.length}종</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-zinc-800 rounded-full h-1.5">
                        <div
                          className={`rounded-full h-1.5 ${pct===100?"bg-green-400":pct>0?"bg-amber-400":"bg-zinc-700"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-zinc-400 text-xs w-8">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`flex items-center gap-1 text-xs ${statusColor}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusLabel}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/dashboard/company/${brand.id}`}>
                      <ChevronRight className="w-4 h-4 text-zinc-600 hover:text-zinc-300 transition-colors" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
