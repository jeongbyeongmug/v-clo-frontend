import Search from './Search'
import '../styles/Nav.css'
import { NavLink } from 'react-router-dom'

export default function Nav({isLogin, onLogout}) {

    return (
    <nav className="nav">
        <p>nav</p>
        <Search />
        <div className="navBtn">
            <div><NavLink to="/">Home</NavLink></div>&nbsp;
            { isLogin ? 
                <div><NavLink to='/' onClick={() => {onLogout()}}>로그아웃</NavLink></div>
                :
                <div><NavLink to='/login'>로그인</NavLink></div>
            }&nbsp;
            <div><NavLink to="/cart">Cart</NavLink></div>&nbsp;
            <div><NavLink to="/myPage">MyPage</NavLink></div>&nbsp;
        </div>
    </nav>
)}//Nav