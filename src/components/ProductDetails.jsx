import React, { useState } from 'react';

import Review from '../components/Review.jsx';
import Qna from '../components/QnA.jsx';
import RelatedProducts from '../components/RelatedProducts.jsx';
import '../styles/Review.css';
import { Link, useSearchParams } from 'react-router-dom';

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id'); 

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('상품정보');

  const [mainImage, setMainImage] = useState("/images/blackYak-jacket.jpg");
  const [selectedColorName, setSelectedColorName] = useState("Ivory(model)");

  const benefits = [
    { id: '01', title: '첫 회원가입', desc: '중복 5천원 할인' },
    { id: '02', title: '회원 등급별', desc: '최대 5만원 쿠폰' },
    { id: '03', title: '최대 5% 적립', desc: '멤버십 적립금' },
    { id: '04', title: '사이즈', desc: '1회 무료교환' },
    { id: '05', title: '매월 1일 발급', desc: '무료배송 쿠폰' },
  ];

  const colorOptions = [
    { name: 'Black', src: '/images/blackYak-black.jpg' },
    { name: 'Ivory', src: '/images/blackYak-ivory.jpg' },
    { name: 'Mint', src: '/images/blackYak-mint.jpg' },
    { name: 'Pink', src: '/images/blackYak-pink.jpg' },
  ];

  const detailBtnText = isOpen ? "상세정보 닫기 ▲" : "상세정보 보기 ▼";
  const detailClass = isOpen ? "details-content open" : "details-content";

  return (
    <div className="productDetails-container">
      <header className="main-header">
        <div className="container"><h2>V-CLO</h2></div>
      </header>

      <main className="container">
      

        <section className="product-top">
          <div className="product-image">
            <img src={mainImage} alt="상품 이미지" onError={(e) => e.target.src = "https://via.placeholder.com/400x500?text=No+Image"} />
          </div>

          <div className="product-info">
            <p className="product-code">상품번호: 1BYJKS3506 M</p>
            <h2 className="product-name">블랙야크자켓</h2>

            <div className="price-row">
              <span className="original">209,300원</span>
              <span className="sale">198,830원</span>
              <span className="discount">5%</span>
            </div>

            <div className="badges">
              <span className="badge">쿠폰할인</span>
              <span className="badge">즉시출고</span>
              <span className="badge">무료교환</span>
            </div>

            <div className="info-box">
              <div className="info-row">
                <div className="info-label">카드혜택</div>
                <div className="info-value">무이자 혜택</div>
              </div>

              <div className="info-row">
                <div className="info-label">배송예상</div>
                <div className="info-value">
                  <span className="bold underline">12시 이전 주문시 오늘출발 가능</span>
                  <p className="sub-text2">02월 06일 (금) 도착 예정</p>
                </div>
              </div>
            </div>

            <div className="option-selection">
              <div className="selection-row">
                <div className="label">옵션</div>
                <div className="content">
                  <p className="selected-name">{selectedColorName}</p>
                  <div className="color-select">
                    {colorOptions.map((color) => (
                      <div
                        key={color.name}
                        className="select"
                        onClick={() => {
                          setMainImage(color.src);
                          setSelectedColorName(color.name);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <img src={color.src} alt={color.name} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="selection-row">
                <div className="label">사이즈</div>
                <div className="content">
                  <div className="size-buttons">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button key={size} className="btn-size">
                        <img src="/images/deliveryMan.jpg" className="icon-delivery" alt="delivery icon" />
                        {size} [즉시출고]
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="buy-section">
              <div className="total-price-row">
                <span>총금액</span>
                <span className="price"><strong>0</strong>원</span>
              </div>
              <div className="action-group">
                <div className="btn-icon">
                  <span className="icon">♥</span><span className="count">2,643</span>
                </div>
                <button className="btn-cart">장바구니</button>
                <div className="buy-wrap">
                  <span className="pay-badge">●pay 결제가능</span>
                  <button className="btn-buy">구매하기</button>
                </div>
              </div>

              <div className="naverPay-box">
                <div className="naverPay-top">
                  <div className="naverPay-logo-area">
                    <span className="naverPay-logo">NAVER</span>
                    <span className="naverPay-text">
                      네이버ID로 간편구매<br />네이버페이
                    </span>
                  </div>
                  <div className="naverPay-buttons">
                    <button className="naverPay-buy-btn"><span>N</span> pay 구매</button>
                    <button className="naverPay-wish-btn">찜</button>
                  </div>
                </div>
                <div className="naverPay-event-row">
                  <div className="naverPay-event-text">
                    <span className="naverPay-event-tag">이벤트</span> 결제 최대혜택 10% 추가적립
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-label">소재</div>
                  <div className="info-value">
                    <p className="sub-text">겉감: 폴리에스터 100%</p>
                    <p className="sub-text">취급시 주의사항: <br />제품 라벨(Label) 및 태그(Tag) 참조</p>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-label">모델 정보</div>
                  <div className="info-value">
                    <p className="sub-text">아이유 162cm </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="product-detail-tabs">
          <ul className="tab-menu">
            {['상품정보', '관련상품', '리뷰', 'Q&A', '배송/환불'].map(tab => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? 'active' : ''}
              >
                {tab}
              </li>
            ))}
          </ul>
        </section>

        {activeTab === '상품정보' && (
          <>
            <section className="membership-section">
              <div className="membership-header">
                <h2 className="membership-title">Membership</h2>
                <p className="membership-subtitle">멤버십 혜택</p>
              </div>
              <ul className="benefit-list">
                {benefits.map((benefit) => (
                  <li key={benefit.id}>
                    <span className="benefit-num">{benefit.id}</span>
                    <p className="benefit-txt">
                      <strong>{benefit.title}</strong><br />{benefit.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="product-bottom">
              <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                {detailBtnText}
              </button>

              <div className={detailClass}>
                <div style={{ padding: '20px 0', backgroundColor: '#fff', textAlign: 'center' }}>
                  <img src="/images/blackYak-jacket.jpg" alt="상세1" style={{ width: '100%', maxWidth: '800px' }} />
                  <img src="/images/blackYak-jacket.jpg" alt="상세2" style={{ width: '100%', maxWidth: '800px' }} />
                  <img src="/images/blackYak-jacket.jpg" alt="상세2" style={{ width: '100%', maxWidth: '800px' }} />
                  <img src="/images/blackYak-jacket.jpg" alt="상세2" style={{ width: '100%', maxWidth: '800px' }} />
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === '리뷰' && <Review />}
        {activeTab === '관련상품' && <RelatedProducts />}
        {activeTab === 'Q&A' && <QnA />}
        {activeTab === '배송/환불' && <div style={{ padding: '100px 0', textAlign: 'center' }}>무료 배송 및 7일 이내 환불 가능합니다.</div>}

        <ul className="product_list2">
          {[
            { id: 'p1', img: '/images/blackYak-black.jpg', name: '루디안 스트라이프 울 니트', price: '19,320', discount: '57%' },
            { id: 'p2', img: '/images/blackYak-pink.jpg', name: '루디안 스트라이프 울 니트', price: '19,320', discount: '57%' },
            { id: 'p3', img: '/images/blackYak-mint.jpg', name: '루디안 스트라이프 울 니트', price: '19,320', discount: '57%' },
            { id: 'p4', img: '/images/blackYak-ivory.jpg', name: '루디안 스트라이프 울 니트', price: '19,320', discount: '57%' },
          ].map(item => (
            <li className="product_item2" key={item.id}>
              <Link to={`/Productpage?id=${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product_box2">
                  <div className="img_area">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="info_area">
                    <div className="price_top">
                      <span className="discount">{item.discount}</span>
                      <span className="origin_price">40,000</span>
                    </div>
                    <div className="sale_price">{item.price}원</div>
                    <p className="item_name">{item.name}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">DELIVERY</h3>
            <p>교환/반품주소지 : <br />경기도 성남시 분당구 판교역로 77번길<br /> 가상디지털타워 B동 지하 1층 (V-CLO 물류팀 담당)</p>

            <h3 className="footer-title mt-20">CUSTOMER CENTER</h3>
            <div className="cs-buttons">
              <button className="btn-kakao">Kakaotalk 문의하기</button>
              <button className="btn-naver">Naver 문의하기</button>
            </div>
            <p className="cs-hours">월-금 AM 11 - PM 5 (주말/공휴일 휴무)</p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">NOTICE +</h3>
            <ul className="footer-list">
              <li>- 해외 수입 관세 정책 안내</li>
              <li>- 2026 설 배송 일정 안내</li>
            </ul>
            <h3 className="footer-title mt-20">ABOUT V-CLO</h3>
            <div className="company-info">
              <p>V-CLO 패션그룹 주식회사</p>
              <p>사업자번호: 215-87-38531</p>
              <p className="copyright">Copyright (c) V_CLO All Rights Reserved.</p>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">SOCIAL</h3>
            <div className="social-icons">
              <a href="#instagram"><img src="/images/instagram.jpg" alt="IG" className="sns-img" /></a>
              <a href="#facebook"><img src="/images/facebook.jpg" alt="FB" className="sns-img" /></a>
              <a href="#youtube"><img src="/images/youtube.jpg" alt="YT" className="sns-img" /></a>
            </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHRYwEqaN2sWvraNAIGQrfBbpXItgO0juNYA&s" className="companyImg" alt="company"></img>
          </div>
        </div>
      </footer>
    </div>
  );
}