import { useProduct } from '../context/ProductContext';
import {NavLink,Routes,Route} from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import Home from './Home';
import SideBar from '../components/SideBar';

import MyPage from './MyPage';
import Cart from './Cart';

export default function Section({isLogin, id, handleApplyCoupon, cartItems, handleAddToCart, appliedDiscount, setCartItems}) {
    const { product } = useProduct();
    return (
    <section className="section">
        <div className="mainContainer">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/productList/*' element={<ProductList />} />
                <Route path='/productDetail/*' element={<ProductDetails  handleAddToCart={handleAddToCart} isLogin={isLogin}/>} />
                <Route path="/myPage" element={<MyPage id={id} coupons={[{ id: 1, name: '50% 쿠폰' }]} handleApplyCoupon={handleApplyCoupon} />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} handleAddToCart={handleAddToCart} isLogin={isLogin}
                                                handleQuantityChange={(id, d) => setCartItems(prev => prev.map(i => i.id === id 
                                                    ?
                                                     { ...i, count: Math.max(1, i.count + d) } 
                                                    :
                                                    i))} 
                                                handleRemoveItem={id => setCartItems(prev => prev.filter(i => i.id !== id))} appliedDiscountRate={appliedDiscount} />} />
                

            </Routes>
        </div>
        <div className="chatSupport">
            <img src="/public/images/talk-icon-brown.jpg" width="80"/>
        </div>
    </section>
)}//Section