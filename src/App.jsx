import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Header from './components/Header'
import Nav from './components/Nav'
import Section from './components/Section'
import Footer from './components/Footer'

import Login from './components/Login'
import FindId from './components/FindId';
import FindPassword from './components/FindPassword';
import Join from './components/Join';

import Cart from './components/Cart';



function App() {

  useEffect(() => { // 테스트용 회원정보 (아이디, 패스워드)
    localStorage.setItem('userInfo'
      , JSON.stringify([
        {userId: 'admin', userPassword: '1234', userPhone: '01111111111'},
        {userId: 'vclo', userPassword: '55555', userPhone: '01055555555'}
      ]))});

  const navigate = useNavigate(); //Hook useNavigate 정의

  const [loginInfo, setLoginInfo] = useState({isLogin:false, id:'', password:''}); //로그인 상태관리 객체 정의
  const {isLogin, id, password} = loginInfo; //로그인 상태관리 구조분해

  const [otpInfo, setOtpInfo] = useState({isOtp:false, myOtp:''}); //인증번호 랜덤 6자리 생성 (alert로 표시)
  const {isOtp, myOtp} = otpInfo;

  if(!isLogin) {
    const loginCheck = JSON.parse(sessionStorage.getItem('loginInfo'));
    
    
    if(loginCheck != null) {  //로그인 여부 확인
      console.log(`로그인 상태..`)
      setLoginInfo({
        isLogin: true, id: loginCheck.id, password: loginCheck.password
      });
    } else console.log('로그인하세요')
  }//if_else 

  const onLoginSubmit = (id, password) => { //로그인 (아이디, 패스워드) submit
    const joinCheck = JSON.parse(localStorage.getItem('userInfo'))
    .find(({userId, userPassword}) => (userId===id && userPassword===password));

    if(joinCheck) {
      const loginCheck = ({
        isLogin: true, id: joinCheck.userId, password: joinCheck.userPassword
      });
      sessionStorage.setItem('loginInfo', JSON.stringify(loginCheck));
      setLoginInfo(loginCheck);
      navigate('/');
    } else {
      alert('아이디 또는 패스워드를 확인하세요.');
      navigate('/login');
    }
  }//onLoginSubmit

  const onLogout = () => { //로그아웃 상태로 변환
    sessionStorage.clear();
    setLoginInfo({isLogin:false, id:'', password:''})
  }//onLogout

  const onPhoneSubmit = (phone) => { // 휴대전화 인증
    const phoneCheck = JSON.parse(localStorage.getItem('userInfo'))
    .find(({userPhone}) => (userPhone===phone));

    if(phoneCheck) {
      const newOtp =String(Math.floor(Math.random() * 1000000) + 1000000).substring(1, 7);
      setOtpInfo({...otpInfo, myOtp: newOtp});
      alert(`본인인증번호는 [${newOtp}]입니다. 정확히 입력해주세요`);
      console.clear();
      console.log(`본인인증번호는 [${newOtp}]입니다. 정확히 입력해주세요`);
    }//if
  }//onPhoneSubmit

  const [findId, setFindId] = useState('');
  const onOtpSubmit = (otp, phone) => { //otp 확인
    if(otp===myOtp) {
      alert(`인증완료`)
      setOtpInfo({...otpInfo, isOtp:true}) //인증 이후 화면전환

    const joinCheck = JSON.parse(localStorage.getItem('userInfo'))
    .find(({userPhone}) => (userPhone===phone));
    setFindId(joinCheck.userId);
    } else alert(`인증 번호가 올바르지 않습니다. 다시 입력해 주세요.`);
  }//onCheckOtpSubmit

  

  const [cartItems, setCartItems] = useState([
    {id:101, name:'보송폭닥 크롭 니트', price:22800, count:1, img:'https://images.unsplash.com/photo-1576185055363-6d7c88000919?q=80&w=200'}
  ]);

  const handleAddToCart = (product) => {
    if (cartItems.find(item => item.id === product.id)) {
      alert('이미 장바구니에 있는 상품입니다.');
      return;
    }
    setCartItems([...cartItems, { ...product, count: 1 }]);
    alert('장바구니에 상품을 담았습니다.');
  };

  const [appliedDiscount] = useState(0);

  return (
    <Routes>
      {/* 기본 화면: 헤더, 네브, 바디 다 보여주고 싶을 때 */}
      <Route path="*" element={
        <>
          <Header />
          <Nav isLogin={isLogin} onLogout={onLogout} />
          <Section />
          <Footer />
        </>
      } />
       
      {/* 로그인 화면: 깔끔하게 로그인 컴포넌트만! */}
      <Route path="/login/*" element={<Login onLoginSubmit={onLoginSubmit}/>} />
      <Route path="/login/find-id" element={<FindId onPhoneSubmit={onPhoneSubmit} onOtpSubmit={onOtpSubmit} otpInfo={otpInfo} setOtpInfo={setOtpInfo} findId={findId}/>} />
      <Route path="/login/find-password" element={<FindPassword />} />
      <Route path="/login/join" element={<Join />} />

      
      {/* 장바구니, 마이페이지 */}
      {/* < element={loginInfo.isLogin ? 
        <Cart cartItems={cartItRoute path="/cart"ems} onAddToCart={handleAddToCart} handleQuantityChange={(id,d)=>setCartItems(prev=>prev.map(i=>i.id===id?{...i,count:Math.max(1,i.count+d)}:i))} handleRemoveItem={id=>setCartItems(prev=>prev.filter(i=>i.id!==id))} appliedDiscount={appliedDiscount} /> 
        : <Navigate to="/login" />} /> */}

      {/*<Route path="/myinfo" element={loginInfo.isLogin ? 
        <MyPage id={loginInfo.id} coupons={[{id:1, name:'50% 쿠폰'}]} handleApplyCoupon={()=>alert('적용!')} /> 
        : <Navigate to="/login" />} />
      
      <Route path="/login" element={<Login onLoginSubmit={(id)=>{ const d={isLogin:true, id:id}; sessionStorage.setItem('loginInfo',JSON.stringify(d)); setLoginInfo(d); navigate('/'); }}/>} /> */}
    </Routes>
  );
}

export default App