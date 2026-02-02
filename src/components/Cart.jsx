import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { 
  FiUser, FiShoppingBag, FiPackage, FiEdit3, FiArrowRight, FiHome, 
  FiTrash2, FiPlus, FiMinus, FiDatabase, FiTag, FiCheckCircle, FiHeart, FiShoppingCart
} from 'react-icons/fi';

export default function Cart(){
  const CartPage = ({ cartItems, handleQuantityChange, handleRemoveItem, appliedDiscount, onAddToCart }) => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState(cartItems.map(item => item.id));

  const popularProducts = [
    { id: 901, name: "여리핏 루즈 가디건", price: 24500, img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=200" },
    { id: 902, name: "와이드 핀턱 슬랙스", price: 38000, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200" },
    { id: 903, name: "데일리 베이직 티셔츠", price: 12000, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200" },
    { id: 904, name: "모던 체크 재킷", price: 59000, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200" }
  ];

  const toggleCheck = (id) => {
    selectedIds.includes(id) ? setSelectedIds(selectedIds.filter(i => i !== id)) : setSelectedIds([...selectedIds, id]);
  };

  const productTotal = cartItems.reduce((acc, cur) => acc + (cur.price * cur.count), 0);
  const deliveryFee = (productTotal >= 80000 || productTotal === 0) ? 0 : 3000;
  const finalTotal = productTotal - appliedDiscount + deliveryFee;

  return (
    <div className="container">
      <header className="header">
        <div className="inner">
          <div className="logo" onClick={()=>navigate('/')}>V-CLO</div>
          <div className="header-icons"><FiUser size={24} cursor="pointer" onClick={() => navigate('/myinfo')} /><FiShoppingBag size={24} style={{color:'#A67C52'}} /></div>
        </div>
      </header>
      <main className="inner">
        <div className="cart-title">장바구니 ⓘ</div>
        <div className="cart-container">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-row">
              <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleCheck(item.id)} className="checkbox"/>
              <img src={item.img} alt="p" className="product-img" style={{width:'60px', height:'75px', objectFit:'cover'}} />
              <div style={{flex:1}}><div style={{fontWeight:'bold', fontSize:'14px'}}>{item.name}</div><div>{item.price.toLocaleString()}원</div></div>
              <div className="quantity-control">
                <FiMinus onClick={()=>handleQuantityChange(item.id, -1)} cursor="pointer"/><span style={{margin:'0 10px'}}>{item.count}</span><FiPlus onClick={()=>handleQuantityChange(item.id, 1)} cursor="pointer"/>
              </div>
              <FiTrash2 onClick={()=>handleRemoveItem(item.id)} cursor="pointer" color="#ddd"/>
            </div>
          ))}
          
          <div className="price-summary">
            <div className="price-row"><span>상품 합계</span><span>{productTotal.toLocaleString()}원</span></div>
            {appliedDiscount > 0 && <div className="price-row" style={{color:'#ff4d4f'}}><span>할인 금액</span><span>- {appliedDiscount.toLocaleString()}원</span></div>}
            <div className="price-row" style={{marginTop:'15px', paddingTop:'15px', borderTop:'2px solid #333'}}><span style={{fontWeight:'bold'}}>결제예정금액</span><span style={{fontWeight:'bold', fontSize:'24px', color:'#A67C52'}}>{finalTotal.toLocaleString()}원</span></div>
          </div>
          
          <div className="order-btn-group">
             <button className="btn-select" onClick={()=>alert('선택 상품을 주문합니다.')}>선택상품 주문하기</button>
             <button className="btn-all" onClick={()=>alert('상품이 주문되었습니다.')}>전체상품 주문하기</button>
          </div>
        </div>

        <div className="popular-section" style={{marginTop:'50px', paddingBottom:'80px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'20px'}}>
            <FiShoppingCart color="#A67C52"/>
            <h3 style={{fontSize:'16px', margin:0}}>실시간 인기 급상승! 많이 담긴 상품</h3>
          </div>
          <div className="grid-4">
            {popularProducts.map(prod => (
              <div key={prod.id} className="pop-card">
                <img src={prod.img} alt="popular" className="pop-img" />
                <div style={{padding:'12px', textAlign:'center'}}>
                  <div style={{fontSize:'13px', fontWeight:'500', marginBottom:'5px'}}>{prod.name}</div>
                  <div style={{fontSize:'15px', fontWeight:'bold', color:'#A67C52', marginBottom:'10px'}}>{prod.price.toLocaleString()}원</div>
                  <button className="pop-add-btn" onClick={() => onAddToCart(prod)}>+ 담기</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
}