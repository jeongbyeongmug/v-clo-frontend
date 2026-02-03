import ProductList from './ProductList'
import Section from './Section'
import {useState} from 'react'
import {Routes, Route, useNavigate, NavLink} from 'react-router-dom'
import { useProduct } from '../context/ProductContext';


export default function Search() {
    const [textVal,setTextVal] = useState('');
    const navigate = useNavigate();
    const { product } = useProduct();

    const onChangeText= (e) => {
        setTextVal(e.target.value);
    }
    const onClickSubmit = () => {
        if (textVal.trim()==="") return;
        else { const query = textVal.toLowerCase();
            navigate(`/productList?query=${query}&page=1`);
        }
    }
    const searchLi = product
        .filter(({title})=>
            title.toLowerCase().includes(textVal.toLowerCase())
    ).map( ({id,title}) => (
        <li key={id} className="searchLi">
            <NavLink to={`/productList?query=${title}&page=1`} className="nav-link">
                {title} 
            </NavLink>
        </li>
    ));

    return (
    <div id="search">
        <div id="searchDiv">
            <input type="text" 
                onChange={onChangeText}
                onKeyDown={(e)=>{if(e.key=='Enter') onClickSubmit();}}
                value={textVal}/>
            <button className="btnIcon" onClick={onClickSubmit}>
                <img className="icon" src="/public/images/to-look-for-icon-brown.jpg" height="25" />
            </button>
        </div>

        {textVal.trim() !== "" && (
        <div>
            <ul className="searchLi">
                {searchLi}
            </ul>
        </div>
        )}
    </div>
)}//Search


