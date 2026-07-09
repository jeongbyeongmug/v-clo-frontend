# 🧥 V-CLO — 의류 쇼핑몰 (5인의 옷장)

> KDT 과정에서 진행한 **첫 팀 프로젝트**(5인 세미프로젝트)입니다. React 기반 의류 쇼핑몰로, 저는 **장바구니 · 결제 · 마이페이지 · 사이드바 · 메인 Section**을 담당했습니다.

- **배포**: https://jeongbyeongmug.github.io/v-clo-frontend/ ｜ **기간**: 2026.01 ~ 2026.02 ｜ **팀**: 5인
- **기술**: React 19 · Vite · React Router v7 · styled-components · Axios
- **담당 (정병묵)**: 장바구니 · 결제 · 마이페이지 · 사이드바(스마트 서치·마이픽·채널 연결·빠른 이동) · 메인 Section
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

### 💳 결제 — 쿠폰·포인트 할인 계산
- 쿠폰 + 포인트를 반영한 **최종 결제 금액**과 **1% 적립 예정액**을 계산
- 포인트는 **‘쿠폰 적용 후 남은 결제액’과 ‘보유 포인트’ 중 작은 값까지만** 사용되도록 상한을 둬 초과 사용 방지

```jsx
// PayMent.jsx — 포인트 사용 상한 (남은 결제액을 넘겨 쓸 수 없게)
const maxUsableByPrice = Math.max(0, productPrice - coupon);
const finalUse = Math.min(totalPoint, maxUsableByPrice);
```

### 👤 마이페이지 — 탭 기반 주문·활동 관리
- **탭 UI**로 주문현황 · 주문/배송조회 · 취소/반품/교환 내역 · 최근 본 상품 · 찜한 상품을 분리 구성
- 주문/배송조회에서 **배송 추적 모달** 제공, 쿠폰 적용 처리
- 찜한 상품(`wishlist`)은 마이페이지 탭과 사이드바 **‘마이픽’ 패널** 양쪽에서 확인

### 🧭 사이드바 — 플로팅 스마트 내비게이션
화면 우측에 상시 떠 있는 사이드바를 직접 설계·구현했습니다.
- **스마트 서치** — 스타일 검색 + 6개 필터(컬러·타입·배송·주요소재·FIT·무드) 아코디언(선택/해제 토글) + 사이즈/가격 디테일 슬라이더(가격·할인율·총기장·가슴단면·소매기장) + 필터 초기화
- **마이픽** — 마이페이지에서 찜한 상품을 미니 카드로 빠르게 확인(개수 뱃지 · 빈 상태 처리)
- **네이버 톡톡 · 카카오 채널** 외부 채널 새 탭 연결, **최상단/최하단 즉시 이동** 버튼
- 로그인이 필요한 메뉴는 **가드**로 막고 로그인 페이지로 유도

```jsx
// SideBar.jsx — 로그인 가드 + 외부 채널 새 탭 연결
if (!isLogin) { alert('로그인 후 이용 가능합니다.'); navigate('/login'); return; }
if (externalUrl) window.open(externalUrl, "_blank");   // 네이버 톡톡 / 카카오 채널
```

<br>

## 🤝 협업 — 개인 브랜치 → PR → 통합
5명이 각자 개인 브랜치에서 작업하고 PR로 `combine` 브랜치에 통합했습니다(PR #40~#52). 충돌이 잦은 `App.jsx`(라우팅·전역 상태 집결지)는 **PR 전에 `combine`을 먼저 당겨와 로컬에서 충돌을 해소한 뒤 올리는** 순서로 처리했습니다.

<br>

## 🧩 주요 기능 (팀 전체)
상품(목록·상세·검색·추천) · 장바구니(담기·수량·삭제·선택결제) · 주문/결제 · 회원(가입·로그인·아이디/비번 찾기) · 마이페이지 · 리뷰 · 1:1 문의

## 📂 폴더 구조
```
src/
├─ components/   # Cart, PayMent, MyPage, SideBar, Section ...
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
