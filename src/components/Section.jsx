import { useProduct } from '../context/ProductContext';
import {NavLink,Routes,Route} from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import Home from './Home';
import SideBar from '../components/SideBar';
 './Home';

export default function Section() {
    const { product } = useProduct();
    return (
    <section className="section">
        <div className="mainContainer">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/productList/*' element={<ProductList />} />
                <Route path='/productDetails/*' element={<ProductDetails />} />
                

            </Routes>
        </div>
        <div className="chatSupport">
            <p>chat support</p>
            <img src="/public/images/talk-icon-brown.jpg"/>
        </div>
        <nav className="sideNav">
            <Routes>
                <Route path='/' element={<SideBar />} />
            </Routes>
        </nav>
    </section>
)}//Section