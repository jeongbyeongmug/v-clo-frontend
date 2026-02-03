import React, { useState, useEffect } from 'react';
import '../styles/Header.css'

export default function Header() {
  const [bannerIndex, setBannerIndex] = useState(0);
  const banners = [
    "지금 가입하면 즉시 사용 가능한 5,000P 증정! ✨",
    "오늘만 전 상품 무료배송 혜택을 놓치지 마세요 🚚",
    "V-CLO 단독 신상 10% SALE 진행 중 👗"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <header className="header">
      {/* 최상단 띠 배너 영역 */}
      <div className="top-banner">
        <div className="banner-content">
          {banners[bannerIndex]}
        </div>
        {/* <button className="banner-close" onClick={(e) => e.target.closest('.top-banner').style.display = 'none'}>
          ✕
        </button> */}
      </div>
    </header>
  );
}