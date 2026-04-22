import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Trash2, Package, Plus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { createProduct, deleteProduct, deleteProductLine } from "./actions";
import { ProductImageUpload } from "./product-image-upload";

const statusMap: Record<string, { label: string; className: string }> = {
  draft: { label: "초안", className: "bg-zinc-800 text-zinc-300 border-zinc-700" },
  active: { label: "활성", className: "bg-green-500/10 text-green-400 border-green-500/30" },
  archived: { label: "보관", className: "bg-zinc-700 text-zinc-400 border-zinc-600" },
};

export default async function ProductLineDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; add?: string }>;
}) {
  const { id } = await params;
  const { error, add } = await searchParams;
  const supabase = await createClient();

  const { data: line } = await supabase
    .from("product_lines")
    .select("*, seasons(name), categories(name)")
    .eq("id", id)
    .single();

  if (!line) notFound();

  const { data: products } = await supabase
    .from("products")
    .select("*, product_media(url, is_primary)")
    .eq("line_id", id)
    .order("created_at", { ascending: false });

  const s = statusMap[line.status] ?? statusMap.draft;
  const createProductWithId = createProduct.bind(null, id);

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{line.name}</h1>
            <Badge className={s.className}>{s.label}</Badge>
          </div>
          <p className="text-zinc-400 text-sm mt-0.5">
            {line.seasons?.name ?? "시즌 미정"} · {line.categories?.name ?? "카테고리 미정"}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 제품 목록 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">제품 목록 ({products?.length ?? 0})</h2>
            <Link href={`/dashboard/products/${id}?add=1`}>
              <Button size="sm" className="bg-white text-zinc-950 hover:bg-zinc-100 gap-1">
                <Plus className="w-3.5 h-3.5" /> 제품 추가
              </Button>
            </Link>
          </div>

          {/* 제품 추가 폼 */}
          {add === "1" && (
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">새 제품 추가</h3>
                <Link href={`/dashboard/products/${id}`}>
                  <button className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
                </Link>
              </div>
              <form action={createProductWithId} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-300 text-xs">제품명 *</Label>
                    <Input name="name" placeholder="예: 오버핏 셔츠" required className="bg-zinc-800 border-zinc-700 text-white text-sm h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-300 text-xs">SKU</Label>
                    <Input name="sku" placeholder="예: SS26-TOP-001" className="bg-zinc-800 border-zinc-700 text-white text-sm h-9" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-300 text-xs">소재 정보</Label>
                    <Input name="fabric_info" placeholder="면 100%" className="bg-zinc-800 border-zinc-700 text-white text-sm h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-300 text-xs">가격 (원)</Label>
                    <Input name="price" type="number" placeholder="89000" className="bg-zinc-800 border-zinc-700 text-white text-sm h-9" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-zinc-300 text-xs">사이즈 (쉼표로 구분)</Label>
                  <Input name="sizes" placeholder="XS, S, M, L, XL" className="bg-zinc-800 border-zinc-700 text-white text-sm h-9" />
                </div>
                <Button type="submit" size="sm" className="bg-white text-zinc-950 hover:bg-zinc-100 w-full">저장</Button>
              </form>
            </div>
          )}

          {!products || products.length === 0 ? (
            <div className="border border-dashed border-zinc-700 rounded-xl p-12 text-center">
              <Package className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400 text-sm">아직 제품이 없습니다</p>
            </div>
          ) : (
            <div className="space-y-2">
              {products.map((product: any) => {
                const primaryImg = product.product_media?.find((m: any) => m.is_primary)?.url
                  ?? product.product_media?.[0]?.url ?? null;
                return (
                  <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 group">
                    <ProductImageUpload productId={product.id} lineId={id} currentUrl={primaryImg} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-sm">{product.name}</span>
                        {product.sku && <span className="text-zinc-500 text-xs">{product.sku}</span>}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        {product.fabric_info && <span className="text-zinc-400 text-xs">{product.fabric_info}</span>}
                        {product.price && <span className="text-zinc-400 text-xs">{product.price.toLocaleString()}원</span>}
                        {product.sizes && (
                          <span className="text-zinc-400 text-xs">{(product.sizes as string[]).join(" · ")}</span>
                        )}
                      </div>
                    </div>
                    <form action={deleteProduct.bind(null, product.id, id)}>
                      <button type="submit" className="text-zinc-600 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 라인 정보 */}
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h2 className="text-white font-semibold mb-4">라인 정보</h2>
            <div className="space-y-2.5 text-sm">
              {[
                ["라인명", line.name],
                ["시즌", line.seasons?.name ?? "—"],
                ["카테고리", line.categories?.name ?? "—"],
                ["상태", s.label],
                ["공개 여부", line.is_public ? "공개" : "비공개"],
                ["등록일", new Date(line.created_at).toLocaleDateString("ko-KR")],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-zinc-500 w-20 shrink-0">{k}</span>
                  <span className="text-zinc-200">{v}</span>
                </div>
              ))}
            </div>
            {line.description && (
              <p className="text-zinc-400 text-xs mt-4 leading-relaxed">{line.description}</p>
            )}
          </div>

          <form action={deleteProductLine.bind(null, id)}>
            <button
              type="submit"
              className="w-full border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl px-4 py-2.5 text-sm flex items-center justify-center gap-2 transition-colors"
              onClick={(e) => { if (!confirm("이 라인을 삭제하시겠습니까?")) e.preventDefault(); }}
            >
              <Trash2 className="w-4 h-4" /> 라인 삭제
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
