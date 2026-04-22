import { type LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  color?: "emerald" | "cyan" | "violet" | "pink" | "amber" | "orange";
  size?: "lg" | "md" | "sm";
}

const colorMap = {
  emerald: {
    gradient: "from-emerald-300 to-cyan-300",
    bar: "from-emerald-400 to-cyan-400",
    icon: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    sub: "text-emerald-600",
  },
  cyan: {
    gradient: "from-cyan-300 to-blue-300",
    bar: "from-cyan-400 to-blue-400",
    icon: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    sub: "text-cyan-600",
  },
  violet: {
    gradient: "from-violet-300 to-purple-300",
    bar: "from-violet-400 to-purple-400",
    icon: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    sub: "text-violet-600",
  },
  pink: {
    gradient: "from-pink-300 to-rose-300",
    bar: "from-pink-400 to-rose-400",
    icon: "bg-pink-500/15 text-pink-400 border-pink-500/20",
    sub: "text-pink-600",
  },
  amber: {
    gradient: "from-amber-300 to-orange-300",
    bar: "from-amber-400 to-orange-400",
    icon: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    sub: "text-amber-600",
  },
  orange: {
    gradient: "from-orange-300 to-red-300",
    bar: "from-orange-400 to-red-400",
    icon: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    sub: "text-orange-600",
  },
};

export function SectionHeader({ title, subtitle, icon: Icon, color = "emerald", size = "lg" }: SectionHeaderProps) {
  const c = colorMap[color];
  const titleSize = size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-base";

  return (
    <div className="flex items-start gap-3">
      {/* 왼쪽 컬러 바 */}
      <div className={`w-1 rounded-full bg-gradient-to-b ${c.bar} shrink-0 ${size === "lg" ? "h-9 mt-0.5" : "h-6 mt-1"}`} />
      <div className="flex-1">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${c.icon}`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
          <h1 className={`${titleSize} font-bold bg-gradient-to-r ${c.gradient} bg-clip-text text-transparent`}>
            {title}
          </h1>
        </div>
        {subtitle && <p className="text-zinc-500 text-sm mt-1 ml-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// 인라인 섹션 제목 (카드 안에서 사용)
export function SectionTitle({ title, color = "emerald", icon: Icon }: { title: string; color?: keyof typeof colorMap; icon?: LucideIcon }) {
  const c = colorMap[color];
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className={`w-0.5 h-4 rounded-full bg-gradient-to-b ${c.bar}`} />
      {Icon && <Icon className={`w-3.5 h-3.5 ${c.icon.split(" ")[1]}`} />}
      <h2 className={`font-semibold text-sm text-white`}>{title}</h2>
    </div>
  );
}
