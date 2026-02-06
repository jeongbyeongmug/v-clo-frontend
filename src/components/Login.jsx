import {IoEyeOutline, IoEyeOffOutline, IoCloseCircleOutline, IoChevronBack} from 'react-icons/io5'


import '../styles/Login.css'

import kakao from '../assets/images/ic_kakao.svg'
import google from '../assets/images/ic_google.svg'
import naver from '../assets/images/ic_naver.svg'
import apple from '../assets/images/ic_apple.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'



export default function Login({onLoginSubmit}) {
  const navigate = useNavigate();
  const [id, setId] =useState(''); //input_id_value
  const [password, setPassword] =useState(''); //input_password_value
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='login-container'>
    <header>
    <div className='backBtn' onClick={() => {navigate('/')}}><IoChevronBack /></div><br />
    </header>

    <nav>
    <h3>안녕하세요<br/>&nbsp;V - CLO 입니다</h3>
    <span>오인의&nbsp;옷장</span>
    </nav>

    <section>
    <form className='Login-form' 
    onSubmit={(e) => {
      e.preventDefault();
      onLoginSubmit(id, password);
    }}>
      <label className='login-label' htmlFor="login-input">
        <div className='id-group input-group'>
          <input id='login-input' className='login-input input' onChange={(e) => {setId(e.target.value)}} type="text" placeholder='아이디 입력' value={id}/>
          <span onClick={() => {setId('')}}><IoCloseCircleOutline/></span>  {/* input_id_value_id 값을 ''으로 변경 */}
          
        </div>
      </label>
      
      <label className='password-label' htmlFor="password-input">
        <div className='password-group input-group'>
          <input id='password-input' className='password-input input' 
                onChange={(e) => {setPassword(e.target.value)}}
                type={showPassword ? "text" : 'password'} placeholder='비밀번호 입력'/>
          <span onClick={() => {setShowPassword(!showPassword)}}>{showPassword ? <IoEyeOffOutline/> : <IoEyeOutline/>}</span>
          
      </div>
      </label>
      
      
      <input className='loginBtn' type="submit" value='로그인' />

    </form>

    <article>
    <span><NavLink to='/login/find-id'>아이디 찾기</NavLink></span>
    <span><NavLink to='/login/find-password'>비밀번호 찾기</NavLink></span>
    <span><NavLink to='/login/join'>회원가입</NavLink></span>
    </article>

      
    <footer>
        <span>SNS 계정으로 로그인</span>
        <div>
        <a href="https://accounts.kakao.com/login/?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount#login"><img src={kakao} alt="" /></a>
        <a href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Ftakeout.google.com%2F%3Fhl%3Dko&dsh=S-2028769730%3A1770339402394609&followup=https%3A%2F%2Ftakeout.google.com%2F%3Fhl%3Dko&hl=ko&ifkv=AXbMIuBg5BMaG8t6YXO3bZXBenaSPWyXcrrOhIlJd8Vmu7ObluocXqN382MoMbDdln9BICU-VL-mYQ&osid=1&passive=1209600&flowName=GlifWebSignIn&flowEntry=ServiceLogin"><img src={google} alt="" /></a>
        <a href="https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/"><img src={naver} alt="" /></a>
        <a href="https://www.icloud.com/"><img src={apple} alt="" /></a>
        </div>
    </footer>
    </section>
    </div>
    )
  }
