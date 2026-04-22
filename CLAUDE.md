# Model Line — 프로젝트 지침

> 의류/텍스타일 제품 라인 관리 + 모델 에이전시 통합 플랫폼

---

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 서비스명 | Model Line |
| 핵심 사용자 | 브랜드·제조사 (제품 등록·관리), 에이전시 관리자 (모델 홍보) |
| MVP 순서 | Phase 1: 제품 라인 관리 → Phase 2: 모델 에이전시 |
| 플랫폼 | 웹(Next.js) + 앱(Expo/React Native) + 백엔드(Next.js API + Supabase) |

---

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| 웹 프론트엔드 | Next.js 15 (App Router) + Tailwind CSS + shadcn/ui |
| 모바일 앱 | Expo (React Native) |
| 백엔드 API | Next.js API Routes |
| DB / Auth / Storage | Supabase (PostgreSQL + Auth + Storage) |
| 배포 | Vercel (웹), EAS (앱) |

---

## 폴더 구조

```
projects/model-line/
├── CLAUDE.md          ← 이 파일 (AI 지침)
├── ROADMAP.md         ← 기능 로드맵
├── docs/              ← 기획·설계 문서
├── web/               ← Next.js 웹앱
├── app/               ← Expo 모바일 앱
└── backend/           ← 공통 DB 스키마·타입
```

---

## 핵심 규칙

- 모든 작업 결과물은 이 폴더(`projects/model-line/`) 안에만 저장
- 무기고(`/Desktop/main/`) 루트 파일 수정 금지
- DB 스키마 변경 시 반드시 `docs/` 업데이트
- Phase 1 완료 전 Phase 2 기능 개발 금지

---

## 사용자 역할

| 역할 | 권한 |
|------|------|
| Brand Admin | 제품 라인 CRUD, 소재 등록, 디지털 컨텐츠 업로드 |
| Agency Manager | 모델 프로필 등록·홍보, 브랜드 매칭 요청 |
| Super Admin | 전체 관리 |
