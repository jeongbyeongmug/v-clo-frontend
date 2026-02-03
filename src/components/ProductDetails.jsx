import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Review from '../components/Review.jsx';
import Qna from '../components/QnA.jsx';
import RelatedProducts from '../components/RelatedProducts.jsx';
import '../styles/Review.css';
import '../styles/ProductDetails.css';

export default function ProductDetails() {
  const [searchParams] = useSearchParams(); 
  const id = searchParams.get('id'); 

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('상품정보');
  const [mainImage, setMainImage] = useState("https://atimg.sonyunara.com/files/attrangs/goods/168875/list13_694ac197257d3.gif"); // 메인 배너 이미지
  const [selectedColorName, setSelectedColorName] = useState("Ivory(model)");
 
  const benefits = [
    { id: '01', title: '첫 회원가입', desc: '중복 5천원 할인' },
    { id: '02', title: '회원 등급별', desc: '최대 5만원 쿠폰' },
    { id: '03', title: '최대 5% 적립', desc: '멤버십 적립금' },
    { id: '04', title: '사이즈', desc: '1회 무료교환' },
    { id: '05', title: '매월 1일 발급', desc: '무료배송 쿠폰' },
  ];

  const colorOptions = [
    { name: 'black', src: 'https://atimg.sonyunara.com/files/attrangs/goods/168875/1765847263_0.png' },
    { name: 'navy', src: 'https://atimg.sonyunara.com/files/attrangs/goods/168875/1765847262_0.png' },
    { name: 'beige', src: 'https://atimg.sonyunara.com/files/attrangs/goods/168875/1765847574_0.png' },
    { name: 'mocha', src: 'https://atimg.sonyunara.com/files/attrangs/goods/168875/1765847492_0.png' },
  ];

  const detailBtnText = isOpen ? "상세정보 닫기 ▲" : "상세정보 보기 ▼";
  const detailClass = isOpen ? "details-content open" : "details-content";

  return (
    <div className="App">
      <main className="container">
        <section className="product-top">
          <div className="product-image">
            <img src={mainImage} alt="상품 이미지" />
          </div>

          <div className="product-info">
            <p className="product-code">상품번호: nt5392</p>
            <h2 className="product-name">모렌 램스울 크롭 라운드 니트</h2>

            <div className="price-row">
              <span className="original">30,000원</span>
              <span className="sale">22,800원</span>
              <span className="discount">24%</span>
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
                  {/* 수정: 선택된 컬러 이름이 나오도록 변경 */}
                  <p className="selected-name">{selectedColorName}</p>
                  <div className="color-select">
                    {colorOptions.map((color) => (
                      <div 
                        key={color.name} 
                        className="select"
                        /* 클릭 시 이미지와 이름을 변경하는 로직 추가 */
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
                        <img src="https://cdn-icons-png.flaticon.com/512/754/754850.png" className="icon-delivery" alt="delivery" />
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
                    <p className="sub-text">램스울(10%) 폴리,폴리에스터(67%) 나일론(10%)</p>
                    <p className="sub-text">아크릴(10%) 스판,스판덱스(3%)</p>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-label">모델, 상품<br />사이즈 정보</div>
                  <div className="info-value">
                    <p className="sub-text">정윤 Height : 162cm Top : 44반/S Pants : 26inch/s Shoes : 235mm</p>
                    <p className="sub-text">주연 Height : 167cm Top : 44/S Pants : 25inch/S Shoes : 245mm</p>
                    <p className="sub-text">아연 Height : 161cm Top : 44/S Pants : 25inch/S Shoes : 225mm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 하단 탭 메뉴 영역 */}
        <section className="product-detail-tabs">
          <ul className="tab-menu">
            <li onClick={() => setActiveTab('상품정보')} className={activeTab === '상품정보' ? 'active' : ''}>상품정보</li>
            <li onClick={() => setActiveTab('관련상품')} className={activeTab === '관련상품' ? 'active' : ''}>관련상품</li>
            <li onClick={() => setActiveTab('리뷰')} className={activeTab === '리뷰' ? 'active' : ''}>리뷰</li>
            <li onClick={() => setActiveTab('Q&A')} className={activeTab === 'Q&A' ? 'active' : ''}>Q&A</li>
            <li onClick={() => setActiveTab('배송/환불')} className={activeTab === '배송/환불' ? 'active' : ''}>배송/환불</li>
          </ul>
        </section>

        {/* --- 여기 탭 전환 구간 --- */}
        {activeTab === '상품정보' && (
          <>
            {/* 멤버십 영역 */}
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
                <div style={{ padding: '20px 0', backgroundColor: '#fff' }}>
                  {/* 세트 1 */}
                  <div style={{ marginBottom: '50px', textAlign: 'center' }}>
                    <img src="https://atimg.sonyunara.com/attrangs/story/nt5392/kr/content_08.jpg" alt="상세이미지1" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} />
                    <div style={{ marginTop: '20px', fontSize: '15px', color: '#333', lineHeight: '1.8' }}>
                      <p><strong>첫 번째 포인트 제목</strong></p>
                      <p>여기에 첫 번째 설명 줄을 입력하세요.</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '50px', textAlign: 'center' }}>
                    <img src="https://atimg.sonyunara.com/files/attrangs/goodsm/168875/1766025761_12.jpg" alt="상세이미지2" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} />
                    <div style={{ marginTop: '20px', fontSize: '15px', color: '#333', lineHeight: '1.8' }}>
                      <p><strong>두 번째 포인트 제목</strong></p>
                      <p>여기에 첫 번째 설명 줄을 입력하세요.</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '50px', textAlign: 'center' }}>
                    <img src="https://atimg.sonyunara.com/files/attrangs/goodsm/168875/1766478227_8.jpg" alt="상세이미지3" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} />
                    <div style={{ marginTop: '20px', fontSize: '15px', color: '#333', lineHeight: '1.8' }}>
                      <p><strong>세 번째 포인트 제목</strong></p>
                      <p>여기에 첫 번째 설명 줄을 입력하세요.</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '50px', textAlign: 'center' }}>
                    <img src="https://atimg.sonyunara.com/files/attrangs/goodsm/168875/1766121986_4.jpg" alt="상세이미지4" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} />
                    <div style={{ marginTop: '20px', fontSize: '15px', color: '#333', lineHeight: '1.8' }}>
                      <p><strong>네 번째 포인트 제목</strong></p>
                      <p>여기에 첫 번째 설명 줄을 입력하세요.</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '50px', textAlign: 'center' }}>
                    <img src="https://atimg.sonyunara.com/attrangs/story/nt5392/kr/content_09.jpg" alt="상세이미지5" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} />
                    <div style={{ marginTop: '20px', fontSize: '15px', color: '#333', lineHeight: '1.8' }}>
                      <p><strong>다섯 번째 포인트 제목</strong></p>
                      <p>여기에 첫 번째 설명 줄을 입력하세요.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === '리뷰' && <Review />}
        {activeTab === '관련상품' && <RelatedProducts />}
        {activeTab === 'Q&A' && <Qna />}
        {activeTab === '배송/환불' && <div style={{padding: '50px', textAlign: 'center'}}>무료 배송 및 7일 이내 환불 가능합니다.</div>}
      </main>

      {/* Footer 바로 위 상품 리스트 */}
      <ul className="product_list2">
        <li className="product_item2">
          <div className="product_box2">
            <div className="img_area">
              <img src="https://atimg.sonyunara.com/files/attrangs/goods/168953/list1_694dafd0067bd.gif" alt="상품 이미지1" />
            </div>
            <div className="info_area">
              <div className="price_top">
                <span className="discount">57%</span>
                <span className="origin_price">45,000</span>
              </div>
              <div className="sale_price">19,320원</div>
              <p className="item_name">루디안 스트라이프 울 니트</p>
              <div className="item_tags">BEST | 오늘출발</div>
            </div>
          </div>
        </li>

        <li className="product_item2">
          <div className="product_box2">
            <div className="img_area">
              <img src="https://atimg.sonyunara.com/files/attrangs/goods/168929/list1_6952e855210f2.gif" alt="상품 이미지2" />
            </div>
            <div className="info_area">
              <div className="price_top">
                <span className="discount">34%</span>
                <span className="origin_price">40,000</span>
              </div>
              <div className="sale_price">26,460원</div>
              <p className="item_name">헨쉬 터틀넥 셔링 드레이프 기모 니트 티셔츠</p>
              <div className="item_tags">BEST | 오늘출발</div>
            </div>
          </div>
        </li>

        <li className="product_item2">
          <div className="product_box2">
            <div className="img_area">
              <img src="https://atimg.sonyunara.com/files/attrangs/goods/168923/list1_6954140d2291c.gif" alt="상품 이미지3" />
            </div>
            <div className="info_area">
              <div className="price_top">
                <span className="discount">40%</span>
                <span className="origin_price">50,000</span>
              </div>
              <div className="sale_price">30,240원</div>
              <p className="item_name">루멘 알파카 울 케이블 루즈핏 브이넥 니트</p>
              <div className="item_tags">BEST | 오늘출발</div>
            </div>
          </div>
        </li>

        <li className="product_item2">
          <div className="product_box2">
            <div className="img_area">
              <img src="https://atimg.sonyunara.com/files/attrangs/goods/168917/list1_694ef4f0f14dd.gif" alt="상품 이미지4" />
            </div>
            <div className="info_area">
              <div className="price_top">
                <span className="discount">34%</span>
                <span className="origin_price">57,000</span>
              </div>
              <div className="sale_price">37,380원</div>
              <p className="item_name">니쥬 홀가먼트 울 헤어리 폴라 터틀넥 니트</p>
              <div className="item_tags">BEST | 오늘출발</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}