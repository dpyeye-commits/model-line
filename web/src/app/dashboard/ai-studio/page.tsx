import { Suspense } from "react";
import { Cpu } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { AIStudioTabs } from "./tabs";

export default function AIStudioPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <SectionHeader
          icon={Cpu}
          color="amber"
          title="AI 의상 스튜디오"
          subtitle="AI 기술로 의상 모델 이미지를 생성·합성합니다"
        />
      </div>
      <Suspense>
        <AIStudioTabs />
      </Suspense>
    </div>
  );
}
