import React, { useState, useEffect } from 'react';
import '../styles/PayMent.css';

export default function PayMent() {
  // 상태 관리
  const productPrice = 129000;
  const [coupon, setCoupon] = useState(0);
  const [point, setPoint] = useState(0);
  const [pg, setPg] = useState('kakaopay.TC0ONETIME');
  const [payMethod, setPayMethod] = useState('card');
  const [agree, setAgree] = useState(false);

  // 총 결제 금액 계산
  const totalDiscount = coupon + point;
  const finalPrice = Math.max(0, productPrice - totalDiscount);
  const reward = Math.floor(finalPrice * 0.01);

  useEffect(() => {
    // 포트원 초기화
    if (window.IMP) window.IMP.init("imp73111002");
  }, []);

  const useAllPoint = () => {
    setPoint(12500); // 보유 포인트 전액 입력
  };

  const doPay = () => {
    if (!agree) return alert("결제대행 서비스 이용약관에 동의해주세요.");
    
    const { IMP } = window;
    IMP.request_pay({
      pg: pg,
      pay_method: payMethod,
      merchant_uid: `ORD-${new Date().getTime()}`,
      name: "실크 원피스 외",
      amount: finalPrice,
    }, rsp => {
      if (rsp.success) alert("결제가 완료되었습니다!");
      else alert(`결제 실패: ${rsp.error_msg}`);
    });
  };

  return (
    <div className="payMent-container">
      <header className="main-header">
        <h1>MODERN SELECT</h1>
      </header>

      <main className="checkout-wrapper">
        <div className="section-title">ORDER & PAYMENT</div>

        {/* 배송 정보 */}
        <section className="checkout-card">
          <h3>배송 정보</h3>
          <div className="input-group">
            <input type="text" placeholder="받으시는 분 성함" className="input-field" />
            <input type="text" placeholder="연락처 (- 없이 입력)" className="input-field" />
            <input type="text" placeholder="배송지 주소" className="input-field" />
            <textarea placeholder="배송 요청사항을 입력해주세요 (선택)" className="input-field textarea"></textarea>
          </div>
        </section>

        {/* 할인 혜택 */}
        <section className="checkout-card">
          <h3>할인 혜택</h3>
          <div className="flex-row">
            <span className="label">쿠폰 선택</span>
            <span className="sub-info">사용 가능한 쿠폰 2장</span>
          </div>
          <select className="input-field" onChange={(e) => setCoupon(Number(e.target.value))}>
            <option value="0">적용 안 함</option>
            <option value="5000">신규 회원 가입 쿠폰 (-5,000원)</option>
            <option value="10000">시즌 감사 쿠폰 (-10,000원)</option>
          </select>

          <div className="flex-row mt-20">
            <span className="label">포인트 사용</span>
            <span className="sub-info">보유 12,500P</span>
          </div>
          <div className="point-box">
            <input 
              type="number" 
              className="input-field no-margin" 
              placeholder="0" 
              value={point === 0 ? '' : point}
              onChange={(e) => setPoint(Number(e.target.value))}
            />
            <button className="btn-white" onClick={useAllPoint}>전체사용</button>
          </div>
        </section>

        {/* 결제 수단 */}
        <section className="checkout-card">
          <h3>결제 수단</h3>
          <div className="method-grid">
            <div className={`method-item ${pg.includes('kakaopay') ? 'active kakao' : ''}`} 
                 onClick={() => {setPg('kakaopay.TC0ONETIME'); setPayMethod('card');}}>
              <i className="fa-solid fa-comment"></i>
              <span>카카오페이</span>
            </div>
            <div className={`method-item ${pg.includes('tosspay') ? 'active toss' : ''}`} 
                 onClick={() => {setPg('tosspay.tosstest'); setPayMethod('card');}}>
              <span className="logo-t">T</span>
              <span>토스페이</span>
            </div>
            <div className={`method-item ${pg.includes('naverpay') ? 'active naver' : ''}`} 
                 onClick={() => {setPg('naverpay'); setPayMethod('card');}}>
              <span className="logo-n">N</span>
              <span>네이버페이</span>
            </div>
            <div className={`method-item ${pg.includes('inicis') ? 'active' : ''}`} 
                 onClick={() => {setPg('html5_inicis.INIpayTest'); setPayMethod('card');}}>
              <i className="fa-solid fa-credit-card"></i>
              <span>신용카드</span>
            </div>
          </div>
          <div className="agree-check">
            <input type="checkbox" id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <label htmlFor="agree">결제대행 서비스 이용약관 동의 (필수)</label>
          </div>
        </section>

        {/* 최종 금액 요약 */}
        <section className="checkout-card summary">
          <div className="price-line">
            <span>상품 금액</span>
            <span>{productPrice.toLocaleString()}원</span>
          </div>
          <div className="price-line highlight-red">
            <span>할인 금액</span>
            <span>-{totalDiscount.toLocaleString()}원</span>
          </div>
          
          <div className="price-line total-price">
            <span>총 결제금액</span>
            <span className="gold-text">{finalPrice.toLocaleString()}원</span>
          </div>

          <div className="reward-banner">
            <span>구매 적립금 (1%)</span>
            <span className="bold">{reward.toLocaleString()}원 적립</span>
          </div>

          <button className="btn-pay" onClick={doPay}>결제하기</button>
        </section>
      </main>
    </div>
  );
};
