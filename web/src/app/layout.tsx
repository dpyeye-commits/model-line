import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Model Line",
  description: "의류·텍스타일 제품 라인 관리 & 모델 에이전시 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
