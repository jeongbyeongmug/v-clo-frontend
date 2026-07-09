# 🧥 V-CLO — 의류 쇼핑몰 (5인의 옷장)

> KDT 과정에서 진행한 **첫 팀 프로젝트**(5인 세미프로젝트)입니다. React 기반 의류 쇼핑몰로, 저는 **장바구니 · 결제 · 상품 상세**와 **배포**를 담당했습니다.

- **배포**: https://jeongbyeongmug.github.io/v-clo-frontend/ ｜ **기간**: 2026.01 ~ 2026.02 ｜ **팀**: 5인
- **기술**: React 19 · Vite · React Router v7 · styled-components · Axios
- **담당 (정병묵)**: 장바구니 · 결제 · 상품 상세 · 마이페이지(일부) · 메인 Section · 배포(GitHub Pages)
- **팀 레포**: https://github.com/KDT07/V-CLO

<br>

## 🖥 화면

| 홈 | 장바구니 |
| --- | --- |
| ![home](docs/home.png) | ![cart](docs/cart.png) |

<br>

## ⭐ 담당하며 배운 것

**1. 장바구니 상태 설계 + 회고**
장바구니 목록을 최상위 `App`에서 관리하고 `localStorage`에 영속화해 새로고침에도 유지되게 했습니다. 수량·삭제는 원본 배열을 직접 바꾸지 않고 **새 배열로 교체**해 React가 변경을 감지하도록 처리했습니다.
> 다만 장바구니 상태를 Context로 분리하지 않고 props로 내려서, 컴포넌트가 늘수록 **prop drilling**이 생겼습니다. 다시 만든다면 Context나 상태관리 라이브러리로 분리했을 것 — 이 프로젝트에서 가장 크게 배운 점입니다.

**2. 협업 — 개인 브랜치 → PR → 통합**
5명이 각자 개인 브랜치에서 작업하고 PR로 `combine` 브랜치에 통합했습니다(PR #40~#52). 충돌이 잦은 `App.jsx`는 **PR 전에 `combine`을 먼저 당겨와 로컬에서 충돌을 해소한 뒤 올리는** 순서로 처리했습니다.

**3. 배포 — GitHub Pages**
`vite build` 결과물을 `gh-pages` 브랜치로 배포하고, SPA base 경로를 설정했습니다.

<br>

## 🧩 주요 기능 · 담당 파일

- **기능**: 상품(목록·상세·검색·추천) · 장바구니(담기·수량·삭제·선택결제) · 주문/결제 · 회원(가입·로그인·아이디/비번 찾기) · 마이페이지 · 리뷰 · 1:1 문의
- **담당 파일**: `Cart.jsx` · `PayMent.jsx` · `ProductDetails.jsx` · `MyPage.jsx`(일부) · `Section.jsx` · `App.jsx`(라우팅·장바구니 상태)

<br>

## ▶️ 실행

```bash
npm install && npm run dev     # 개발 서버
npm run build                  # 프로덕션 빌드
```

<br>

---

> 첫 팀 프로젝트라 완성도보다 **협업과 상태 설계 경험**에 집중했습니다.
> 백엔드 포트폴리오의 메인 프로젝트는 → [`nailed-springboot-react`](https://github.com/jeongbyeongmug/nailed-springboot-react)
