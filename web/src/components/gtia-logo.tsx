interface Props {
  size?: number;
}

export function GTIALogoIcon({ size = 48 }: Props) {
  const h = Math.round(size * 50 / 58);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 58 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/*
          오렌지 그라디언트
          방향: 하단 왼쪽(진한 레드) → 상단 오른쪽(밝은 앰버)
        */}
        <linearGradient
          id="gtia-flame"
          x1="2"  y1="48"
          x2="22" y2="2"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#C02A06" />
          <stop offset="35%"  stopColor="#E05C10" />
          <stop offset="100%" stopColor="#F7A828" />
        </linearGradient>

        {/* 파란 블록 그라디언트 */}
        <linearGradient
          id="gtia-blue"
          x1="16" y1="2"
          x2="56" y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#5486B4" />
          <stop offset="100%" stopColor="#2E5E8C" />
        </linearGradient>

        {/* 직물 크로스해치 패턴 */}
        <pattern
          id="gtia-mesh"
          x="0" y="0"
          width="5" height="5"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="5" x2="5" y2="0"
            stroke="rgba(255,255,255,0.32)" strokeWidth="0.85" />
          <line x1="0" y1="0" x2="5" y2="5"
            stroke="rgba(255,255,255,0.18)" strokeWidth="0.85" />
        </pattern>
      </defs>

      {/*
        ── 오렌지 J/C 커브 ──

        M 22 2          : 외호 시작 (상단)
        C -4 2,-4 48    : 왼쪽으로 크게 휘어 하강 (최좌 x≈4, y≈25)
          30 48         : 외호 끝 (하단)
        L 30 42         : 하단 우측 직선
        C 12 42,12 8    : 내호 상승 (내측 최좌 x≈13, y≈25)
          16 8          : 내호 끝 (상단 내측)
        L 16 2          : 좌측 상단 직선 → 파란 블록 좌측과 접함
        Z               : (16,2)→(22,2) 상단 가로선으로 닫기
      */}
      <path
        d="M 22 2 C -4 2 -4 48 30 48 L 30 42 C 12 42 12 8 16 8 L 16 2 Z"
        fill="url(#gtia-flame)"
      />

      {/*
        ── 파란 직물 블록 (오렌지 위에 그려서 겹치는 부분 덮음) ──
        좌측: x=16 (오렌지 내호와 접함)
        우측: x=56 (아이콘 우측 끝)
        상단: y=2
        하단: y=32
      */}
      <rect x="16" y="2"  width="40" height="30" rx="3" fill="url(#gtia-blue)" />
      <rect x="16" y="2"  width="40" height="30" rx="3" fill="url(#gtia-mesh)" />
    </svg>
  );
}

export function GTIALogo({
  size = 48,
  showText = true,
  darkText = false,
}: {
  size?: number;
  showText?: boolean;
  darkText?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <GTIALogoIcon size={size} />
      {showText && (
        <div>
          <p className={`font-bold text-base leading-tight ${darkText ? "text-zinc-900" : "text-white"}`}>
            경기섬유산업연합회
          </p>
          <p className={`text-[11px] leading-tight ${darkText ? "text-zinc-500" : "text-zinc-400"}`}>
            Gyeonggi Textile Industries Association
          </p>
        </div>
      )}
    </div>
  );
}
