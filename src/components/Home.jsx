import {NavLink,Routes,Route} from 'react-router-dom';
import '../styles/ProductList.css';
import { useProduct } from '../context/ProductContext';


export default function Home() {
    const { product } = useProduct();
    return (
    <div className="mainContainer">
        <div className="banner">
            <p>banner</p>
        </div>
        <ul className="productUl">
            {product.map(({id, img, model, color, category, title, price})=>{
                return <li key={id}><NavLink to={'/productPage?id='+id}>
                    <img src={img} alt={title} className="thumbnail" /><br />
                    {color[0]}<br />
                    {category[0]} <br />
                    {model}<br />
                    {title}<br />
                    {price}
                </NavLink></li>;
            })}
        </ul>
    </div>
)}//