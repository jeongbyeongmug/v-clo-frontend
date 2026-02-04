import {useSearchParams,NavLink} from 'react-router-dom';
import '../styles/ProductList.css';
import { useProduct } from '../context/ProductContext';
import {SearchResult, Category} from './SearchResult';
import Nav from './Nav';
import SideBar from './SideBar';

export default function ProductList({ isLogin, onLogout }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryValue = 
        searchParams.get('query') || 
        searchParams.get('category') || 
        searchParams.get('model') || 
        searchParams.get('color') ||
        '';
    const { product } = useProduct();
    let searchList = product.filter( ({model, color, category, title}) =>
        model.includes(queryValue) ||
        color.includes(queryValue) ||
        category.includes(queryValue) ||
        title.includes(queryValue)
    );//searchList

    searchList = searchList.map (({id, img, model, color, category, title, price})=> {
        return <li key={id}><NavLink to={'/productDetail?id='+id}>
            <img src={img} alt={title} className="thumbnail" /><br />
            {color}<br />
            {category} <br />
            {model}<br />
            {title}<br />
            {price}
            </NavLink></li>;
    });

    return (
    <>
        <Nav isLogin={isLogin} onLogout={onLogout} />
        <SideBar/>
        {searchParams.get('query')!==null &&
            <SearchResult product={product} searchParams={searchParams} setSearchParams={setSearchParams}/>}
        <Category />

        <div>
            <ul className="productUl">
                {searchList}
            </ul>
        </div>
    </>
)}//ProductList