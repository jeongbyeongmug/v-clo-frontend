import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; 
import Review from '../components/Review.jsx';
import Qna from '../components/QnA.jsx';
import RelatedProducts from '../components/RelatedProducts.jsx';
import Header from '../components/Header.jsx'; 
import Nav from '../components/Nav.jsx';         

import Footer from '../components/Footer.jsx'; 
import '../styles/Review.css';
import '../styles/ProductDetails.css';
import SideBar from './SideBar.jsx';

export default function ProductDetails({ isLogin, onLogout, onAddToCart }) {
  const [searchParams] = useSearchParams(); 
  const id = searchParams.get('id'); 
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('상품정보');
  const [mainImage, setMainImage] = useState("https://atimg.sonyunara.com/files/attrangs/goods/168875/694ac194140cd.jpg");
  const [selectedColorName, setSelectedColorName] = useState("Ivory(model)");
  
  const [selectedItems, setSelectedItems] = useState([]);

  const benefits = [
    { id: '01', title: '첫 회원가입', desc: '중복 5천원 할인' },
    { id: '02', title: '회원 등급별', desc: '최대 5만원 쿠폰' },
    { id: '03', title: '최대 5% 적립', desc: '멤버십 적립금' },
    { id: '04', title: '사이즈', desc: '1회 무료교환' },
    { id: '05', title: '매월 1일 발급', desc: '무료배송 쿠폰' },
  ];

  const colorOptions = [
    { name: 'black', src: '/images/Round-knit-black.jpg' },
    { name: 'navy', src: '/images/Round-knit-navy.jpg' },
    { name: 'beige', src: '/images/Round-knit-beige.jpg' },
    { name: 'mocha', src: '/images/Round-knit-mocha.jpg' },
  ];

  const handleSizeClick = (size) => {
    const itemKey = `${selectedColorName} / ${size}`;
    
    if (selectedItems.find(item => item.key === itemKey)) {
      alert("이미 선택된 옵션입니다.");
      return;
    }

    const newItem = {
      key: itemKey,
      color: selectedColorName,
      size: size,
      price: 22800,
      count: 1
    };
    setSelectedItems([...selectedItems, newItem]);
  };

  const handleCountChange = (key, delta) => {
    setSelectedItems(prev => prev.map(item => 
      item.key === key ? { ...item, count: Math.max(1, item.count + delta) } : item
    ));
  };

  const handleRemoveItem = (key) => {
    setSelectedItems(prev => prev.filter(item => item.key !== key));
  };

  const totalPrice = selectedItems.reduce((acc, item) => acc + (item.price * item.count), 0);

  const detailBtnText = isOpen ? "상세정보 닫기 ▲" : "상세정보 보기 ▼";
  const detailClass = isOpen ? "details-content open" : "details-content";

  const handleCartClick = () => {
    if (selectedItems.length === 0) {
      alert("옵션을 선택해주세요.");
      return;
    }

    selectedItems.forEach(item => {
      const productItem = {
        id: id || Date.now(), 
        name: "모렌 램스울 크롭 라운드 니트",
        price: item.price,
        img: mainImage,
        color: item.color,
        size: item.size,
        count: item.count
      };
      if (onAddToCart) onAddToCart(productItem);
    });
    if(isLogin) {
      navigate('/cart');
    } else navigate('/login')
  };

  const handlePayMent = () => {
    if (selectedItems.length === 0) {
      alert("옵션을 선택해주세요.");
      return;
    }

    selectedItems.forEach(item => {
      const productItem = {
        id: id || Date.now(), 
        name: "모렌 램스울 크롭 라운드 니트",
        price: item.price,
        img: mainImage,
        color: item.color,
        size: item.size,
        count: item.count
      };
      // if (onAddToCart) onAddToCart(productItem); 추후 결제창에 담기게 함수 정의
    });
    if(isLogin) {
      navigate('/payMent');
    } else navigate('/login')
  };

  return (
    <div className="product-details-page">
      <Header />
      <Nav isLogin={isLogin} onLogout={onLogout} />
      <SideBar/>

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
                      <button 
                        key={size} 
                        className="btn-size" 
                        onClick={() => handleSizeClick(size)} // 클릭 시 아이템 추가
                      >
                        <img src="/images/deliveryMan.jpg" className="icon-delivery" alt="delivery" />
                        {size} [즉시출고]
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {selectedItems.length > 0 && (
              <div className="selected-items-list">
                {selectedItems.map(item => (
                  <div key={item.key} className="selected-item-box">
                    <div className="item-name">{item.key}</div>
                    <div className="item-control-row">
                      <div className="count-btn-group">
                        <button onClick={() => handleCountChange(item.key, -1)}>-</button>
                        <span>{item.count}</span>
                        <button onClick={() => handleCountChange(item.key, 1)}>+</button>
                      </div>
                      <div className="item-price-delete">
                        <span>{(item.price * item.count).toLocaleString()}원</span>
                        <button onClick={() => handleRemoveItem(item.key)} className="delete-x">✕</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="buy-section">
              <div className="total-price-row">
                <span>총금액</span>
                <span className="price"><strong>{totalPrice.toLocaleString()}</strong>원</span>
              </div>
              <div className="action-group">
                <div className="btn-icon">
                  <span className="icon">♥</span><span className="count">2,643</span>
                </div>
                <button className="btn-cart" onClick={handleCartClick}>장바구니</button>
                <div className="buy-wrap">
                  <span className="pay-badge">●pay 결제가능</span>
                  <button className="btn-buy" onClick={handlePayMent}>구매하기</button>
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
              </div>
            </div>
          </div>
        </section>

        <section className="product-detail-tabs">
          <ul className="tab-menu">
            <li onClick={() => setActiveTab('상품정보')} className={activeTab === '상품정보' ? 'active' : ''}>상품정보</li>
            <li onClick={() => setActiveTab('관련상품')} className={activeTab === '관련상품' ? 'active' : ''}>관련상품</li>
            <li onClick={() => setActiveTab('리뷰')} className={activeTab === '리뷰' ? 'active' : ''}>리뷰</li>
            <li onClick={() => setActiveTab('Q&A')} className={activeTab === 'Q&A' ? 'active' : ''}>Q&A</li>
            <li onClick={() => setActiveTab('배송/환불')} className={activeTab === '배송/환불' ? 'active' : ''}>배송/환불</li>
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
                <div style={{ padding: '20px 0', backgroundColor: '#fff' }}>
                  <div style={{ marginBottom: '50px', textAlign: 'center' }}>
                    <img src="/images/Round-knit-detail1.jpg" alt="상세이미지1" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} />
                  </div>
                  <div style={{ marginBottom: '50px', textAlign: 'center' }}>
                    <img src="/images/Round-knit-detail2.jpg" alt="상세이미지2" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} />
                  </div>
                   <div style={{ marginBottom: '50px', textAlign: 'center' }}>
                    <img src="/images/Round-knit-detail3.jpg" alt="상세이미지3" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} />
                  </div>
                   <div style={{ marginBottom: '50px', textAlign: 'center' }}>
                    <img src="/images/Round-knit-detail4.jpg" alt="상세이미지4" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} />
                  </div>
                  <div style={{ marginBottom: '50px', textAlign: 'center' }}>
                    <img src="/images/Round-knit-detail5.jpg" alt="상세이미지5" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} />
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

      <ul className="product_list2">
        <li className="product_item2">
          <div className="product_box2">
            <div className="img_area">
              <img src="https://atimg.sonyunara.com/files/attrangs/goods/168953/list13_694dafce0bab2.gif" alt="상품 이미지1" />
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
              <img src="https://atimg.sonyunara.com/files/attrangs/goods/168929/list13_6952e8526c46d.gif" alt="상품 이미지2" />
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
              <img src="https://atimg.sonyunara.com/files/attrangs/goods/168923/list13_6954140a31aef.gif" alt="상품 이미지3" />
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
              <img src="https://atimg.sonyunara.com/files/attrangs/goods/168917/list13_694ef4edebe38.gif" alt="상품 이미지4" />
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
      <Footer />
    </div>
  );
}