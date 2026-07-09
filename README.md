# 🧥 V-CLO — 의류 쇼핑몰 (5인의 옷장)

> KDT 과정에서 진행한 **첫 팀 프로젝트**(5인 세미프로젝트)입니다. React 기반 의류 쇼핑몰로, 저는 **장바구니 · 상품 상세 · 결제**와 **배포**를 담당했습니다.

- **배포**: https://jeongbyeongmug.github.io/v-clo-frontend/ ｜ **기간**: 2026.01 ~ 2026.02 ｜ **팀**: 5인
- **기술**: React 19 · Vite · React Router v7 · styled-components · Axios
- **담당 (정병묵)**: 장바구니 · 상품 상세 · 결제 · 마이페이지(일부) · 메인 Section · 배포(GitHub Pages)
- **팀 레포**: https://github.com/KDT07/V-CLO

<br>

## 🖥 화면

| 홈 | 장바구니 |
| --- | --- |
| ![home](docs/home.png) | ![cart](docs/cart.png) |

<br>

## ⭐ 담당 구현

### 🛒 장바구니 — 선택 결제 + localStorage 영속화
- 장바구니 목록을 최상위 `App`에서 관리하고 `localStorage`에 동기화해 **새로고침에도 담은 상품 유지**
- 체크박스로 고른 상품만 합계·결제되는 **선택 결제**, 쿠폰 할인 · 배송비 · 적립 포인트(1%) 요약 제공
- 수량 변경·삭제는 원본을 직접 바꾸지 않고 **새 배열로 교체**(불변 업데이트)해 React가 변경을 감지하게 처리, 수량은 `Math.max(1, …)`로 하한 보장

> **회고** — 장바구니 상태를 Context로 분리하지 않고 props로 내려서, 컴포넌트가 늘수록 **prop drilling**이 생겼습니다. 다시 만든다면 Context나 상태관리 라이브러리로 분리했을 것 — 이 프로젝트에서 가장 크게 배운 점입니다.

### 👕 상품 상세 — 옵션 선택 · 추천 상품
- **색상 옵션별 선택 리스트**를 만들고 옵션마다 수량을 조절, `reduce`로 **선택 옵션 총액을 실시간 계산**
- 썸네일 클릭 시 메인 이미지 교체 · 상품정보/리뷰 **탭 UI** · 좋아요 토글
- 현재 상품을 제외하고 **추천 상품 4개를 랜덤 노출**(`filter` + 랜덤 추출)

### 💳 결제 — 쿠폰·포인트 할인 계산
- 쿠폰 + 포인트를 반영한 **최종 결제 금액**과 **1% 적립 예정액**을 계산
- 포인트는 **‘쿠폰 적용 후 남은 결제액’과 ‘보유 포인트’ 중 작은 값까지만** 사용되도록 상한을 둬 초과 사용을 방지

```jsx
// PayMent.jsx — 포인트 사용 상한 (남은 결제액을 넘겨 쓸 수 없게)
const maxUsableByPrice = Math.max(0, productPrice - coupon);
const finalUse = Math.min(totalPoint, maxUsableByPrice);
```

- PG사(kakaopay) · 결제수단 · 약관 동의를 검증한 뒤 결제 진행

<br>

## 🤝 협업 — 개인 브랜치 → PR → 통합
5명이 각자 개인 브랜치에서 작업하고 PR로 `combine` 브랜치에 통합했습니다(PR #40~#52). 충돌이 잦은 `App.jsx`(라우팅·전역 상태 집결지)는 **PR 전에 `combine`을 먼저 당겨와 로컬에서 충돌을 해소한 뒤 올리는** 순서로 처리했습니다.

## 🚀 배포 — GitHub Pages
`vite build` 결과물을 `gh-pages` 브랜치로 배포했습니다. 서브경로 호스팅(`/v-clo-frontend/`)에 맞춰 **Vite `base`와 Router `basename`을 설정**해 자산·라우팅 경로를 일치시켰습니다.

<br>

## 🧩 주요 기능 (팀 전체)
상품(목록·상세·검색·추천) · 장바구니(담기·수량·삭제·선택결제) · 주문/결제 · 회원(가입·로그인·아이디/비번 찾기) · 마이페이지 · 리뷰 · 1:1 문의

## 📂 폴더 구조
```
src/
├─ components/   # Cart, ProductDetails, PayMent, Section, MyPage ...
├─ context/      # ProductContext (전역 상품 데이터)
├─ data/         # Product.json, reviews.json (목업 데이터)
├─ styles/       # 스타일 파일
├─ App.jsx       # 라우팅 · 장바구니 상태
└─ main.jsx      # 진입점
```

## ▶️ 실행
```bash
npm install && npm run dev     # 개발 서버
npm run build                  # 프로덕션 빌드
```

<br>

---

> 첫 팀 프로젝트라 완성도보다 **협업과 상태 설계 경험**에 집중했습니다.
> 백엔드 포트폴리오의 메인 프로젝트는 → [`nailed-springboot-react`](https://github.com/jeongbyeongmug/nailed-springboot-react)
