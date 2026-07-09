# 🧥 V-CLO — 의류 쇼핑몰 (5인의 옷장)

> React로 만든 의류 쇼핑몰입니다. KDT 과정에서 처음 진행한 5인 팀 세미프로젝트로, 저는 **장바구니 · 결제 · 상품 상세**와 **배포**를 맡았습니다.

- **배포**: https://jeongbyeongmug.github.io/v-clo-frontend/ ｜ **기간**: 2026.01 ~ 2026.02 ｜ **팀**: 5인 (첫 세미프로젝트)
- **기술**: React 19 · Vite · React Router v7 · styled-components · Axios · react-icons
- **담당 (정병묵)**: 장바구니 · 결제 · 상품 상세 · 마이페이지(일부) · 메인 Section · 배포(GitHub Pages)
- **팀 레포**: https://github.com/KDT07/V-CLO

<br>

## ⭐ 핵심 기여

### 1. 장바구니 상태 관리 — localStorage 영속화 + 불변 업데이트

장바구니 목록(`cartItems`)을 최상위 `App`에서 관리하고, 바뀔 때마다 `localStorage`에 함께 저장했습니다. 새로고침해도 담아 둔 상품이 유지되게 하기 위해서입니다.

```jsx
// App.jsx — 초기값을 localStorage에서 복원
const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

const cartInput = (product) => {
  setCartItems([...cartItems, { ...product }]);
  localStorage.setItem('cartItems', JSON.stringify([...cartItems, { ...product }]));
};
```

수량 변경과 삭제는 원본 배열을 직접 건드리지 않고 **새 배열로 교체**했습니다. 그래야 React가 변화를 감지하기 때문입니다. 수량은 `Math.max(1, ...)`로 1 밑으로는 내려가지 않게 막았습니다.

```jsx
// Cart.jsx
const handleQuantityChange = (id, d) => {
  const cartItemsCheck = cartItems.map(item =>
    item.id === id ? { ...item, count: Math.max(1, item.count + d) } : item
  );
  setCartItems(cartItemsCheck);
  localStorage.setItem('cartItems', JSON.stringify([...cartItemsCheck]));
};

const handleRemoveItem = (id) => {
  const cartItemsCheck = cartItems.filter(item => item.id !== id);
  setCartItems(cartItemsCheck);
  localStorage.setItem('cartItems', JSON.stringify([...cartItemsCheck]));
};
```

### 2. 전역 상품 데이터 공유 — Context API

상품 데이터는 `ProductContext`로 전역에 두고 `useProduct()` 훅으로 꺼내 썼습니다. Provider 밖에서 쓰면 바로 에러를 던지도록 방어 코드도 넣었습니다.

```jsx
// context/ProductContext.jsx
export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct는 ProductProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
}
```

> 다만 장바구니 상태는 Context로 빼지 않고 `App`에서 props로 내려서, 컴포넌트가 늘수록 prop drilling이 생겼습니다. 다시 만든다면 장바구니도 Context(또는 상태관리 라이브러리)로 분리했을 것 같습니다. 이 프로젝트에서 가장 크게 배운 부분입니다.

### 3. 협업 — 개인 브랜치 → PR → combine 통합

5명이 각자 개인 브랜치에서 작업하고 PR로 `combine` 브랜치에 합쳤습니다(PR #40~#52). 충돌이 가장 잦았던 곳은 라우팅과 전역 상태가 모두 모이는 `App.jsx`였습니다. 저는 **PR을 올리기 전에 `combine`을 먼저 제 브랜치로 당겨와 로컬에서 충돌을 해소한 뒤 올리는** 순서로 처리했습니다.

### 4. 배포 — GitHub Pages

`vite build` 결과물을 GitHub Pages(`gh-pages` 브랜치)에 올려 배포했습니다. 백엔드가 없는 프론트 프로젝트라 별도 서버 없이 정적 호스팅으로 결과물을 바로 공유할 수 있었습니다.

<br>

## 🖥 화면

| 홈 | 장바구니 |
| --- | --- |
| ![home](docs/home.png) | ![cart](docs/cart.png) |

<br>

## 🛠 기술 스택

- **Frontend**: React 19, Vite, React Router v7
- **스타일**: styled-components, react-icons
- **통신**: Axios
- **배포**: GitHub Pages

<br>

## 🧩 주요 기능

- 상품: 카테고리별 목록 · 상품 상세 · 검색 · 관련 상품 추천
- 장바구니: 담기 · 수량 변경 · 삭제 · 선택 결제
- 주문 / 결제 페이지
- 회원: 회원가입 · 로그인 · 아이디/비밀번호 찾기
- 마이페이지 · 리뷰 · 1:1 문의(QnA)

<br>

## 📂 폴더 구조

```
src/
├─ components/   # 화면 컴포넌트 (Cart, ProductList, ProductDetails, PayMent, MyPage ...)
├─ context/      # ProductContext (전역 상품 데이터)
├─ data/         # Product.json, reviews.json (목업 데이터)
├─ styles/       # 스타일 파일
├─ assets/       # 이미지
├─ App.jsx       # 라우팅 · 장바구니 상태
└─ main.jsx      # 진입점
```

<br>

## ▶️ 실행 방법

```bash
npm install
npm run dev       # 개발 서버 실행
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 결과 미리보기
```

<br>

## 📁 담당 파일

| 파일 | 내용 |
| --- | --- |
| `components/Cart.jsx` | 장바구니 (담기 · 수량 · 삭제 · 유저 메뉴 연동) |
| `components/PayMent.jsx` | 결제 페이지 |
| `components/ProductDetails.jsx` | 상품 상세 |
| `components/MyPage.jsx` | 마이페이지 (일부) |
| `components/Section.jsx` | 메인 섹션 |
| `App.jsx` | 라우팅 · 장바구니 상태 |

<br>

---

첫 팀 프로젝트라 완성도보다 협업과 상태 설계를 익히는 데 초점을 뒀습니다. 위 회고(장바구니 상태 구조)는 이후 프로젝트에서 개선했습니다.
