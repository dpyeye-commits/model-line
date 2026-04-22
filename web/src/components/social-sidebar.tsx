const LINKS = [
  {
    label: "인스타그램",
    href: "https://www.instagram.com/gtia_official",
    icon: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <defs>
          <radialGradient id="ig-bg" cx="30%" cy="107%" r="120%">
            <stop offset="0%"  stopColor="#ffd600"/>
            <stop offset="25%" stopColor="#ff6930"/>
            <stop offset="50%" stopColor="#fe3b91"/>
            <stop offset="100%" stopColor="#a833d4"/>
          </radialGradient>
        </defs>
        <rect width="60" height="60" rx="14" fill="url(#ig-bg)"/>
        <rect x="15" y="15" width="30" height="30" rx="8" fill="none" stroke="white" strokeWidth="3"/>
        <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="3"/>
        <circle cx="40" cy="20" r="2.2" fill="white"/>
      </svg>
    ),
  },
  {
    label: "페이스북",
    href: "https://www.facebook.com/gtia.or.kr",
    icon: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" rx="14" fill="#1877F2"/>
        <path d="M34 31h4l1-5h-5v-2.5c0-1.4.4-2.5 2.4-2.5H39v-4.4A28 28 0 0 0 35.2 16c-3.9 0-6.5 2.3-6.5 6.5V26h-4v5h4v13h5V31z" fill="white"/>
      </svg>
    ),
  },
  {
    label: "유튜브",
    href: "https://www.youtube.com/@gtia",
    icon: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" rx="14" fill="#FF0000"/>
        <path d="M47 22.5s-.5-3.2-1.9-4.6c-1.8-1.9-3.8-1.9-4.7-2C34.6 15.5 30 15.5 30 15.5s-4.6 0-10.4.4c-.9.1-2.9.1-4.7 2C13.5 19.3 13 22.5 13 22.5S12.5 26.3 12.5 30v3.3c0 3.7.5 7.5.5 7.5s.5 3.2 1.9 4.6c1.8 1.9 4.2 1.8 5.3 2C22.7 47.7 30 47.7 30 47.7s4.6 0 10.4-.4c.9-.1 2.9-.1 4.7-2 1.4-1.4 1.9-4.6 1.9-4.6s.5-3.7.5-7.5V30c0-3.7-.5-7.5-.5-7.5zM26.5 36.5v-13l10.5 6.5-10.5 6.5z" fill="white"/>
      </svg>
    ),
  },
  {
    label: "아워니트",
    href: "https://www.ournit.com",
    icon: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" rx="14" fill="#1a1a1a"/>
        <circle cx="30" cy="30" r="19" fill="none" stroke="#888" strokeWidth="1.5"/>
        <circle cx="30" cy="30" r="23" fill="none" stroke="#666" strokeWidth="1"/>
        <text x="30" y="27" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="700" fontFamily="Arial, sans-serif">OUR</text>
        <text x="30" y="37" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="700" fontFamily="Arial, sans-serif">NiT</text>
        <circle cx="22" cy="30" r="1.5" fill="#888"/>
        <circle cx="38" cy="30" r="1.5" fill="#888"/>
      </svg>
    ),
  },
  {
    label: "텍스그라운드",
    href: "https://www.texground.com",
    icon: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" rx="14" fill="#111111"/>
        <text x="30" y="36" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" fontFamily="Arial Black, Arial, sans-serif" letterSpacing="1">TXG</text>
      </svg>
    ),
  },
  {
    label: "경기섬유종합\n지원센터",
    href: "https://www.g-textopia.com",
    icon: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" rx="14" fill="white"/>
        <text x="30" y="22" textAnchor="middle" fill="#2E7D32" fontSize="8" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0.5">G·TEXTOPIA</text>
        <text x="30" y="34" textAnchor="middle" fill="#2E7D32" fontSize="6.5" fontWeight="600" fontFamily="Arial, sans-serif">경기섬유종합</text>
        <text x="30" y="44" textAnchor="middle" fill="#2E7D32" fontSize="6.5" fontWeight="600" fontFamily="Arial, sans-serif">지원센터</text>
      </svg>
    ),
  },
];

export function SocialSidebar() {
  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50">
      {/* 외곽 테두리 컨테이너 */}
      <div className="bg-white/95 backdrop-blur-sm border-2 border-indigo-300/70 rounded-2xl shadow-xl shadow-indigo-500/10 px-2.5 py-3 flex flex-col gap-3">
        {LINKS.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 group"
          >
            {/* 아이콘 */}
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-150">
              {icon}
            </div>
            {/* 라벨 */}
            <span className="text-zinc-700 text-[9px] font-medium text-center leading-tight whitespace-pre-line">
              {label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
