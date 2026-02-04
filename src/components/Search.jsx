import ProductList from './ProductList'
import Section from './Section'
import {useState} from 'react'
import {Routes, Route, useNavigate, NavLink} from 'react-router-dom'
import { useProduct } from '../context/ProductContext';


export default function Search() {
    const [textVal,setTextVal] = useState(''); /* 검색창 입력글자 보이기 위해 선언*/
    const navigate = useNavigate(); /* 검색 결과로 주소 이동용*/
    const { product } = useProduct(); /* 상품 data 가져오기 */

    /* 글자를 칠때마다 검색글자가 반영되는 이벤트 */
    const onChangeText= (e) => {
        setTextVal(e.target.value);
    }

    /* 검색창: 엔터, 혹은 버튼을 누르면 검색주소로 이동하는 이벤트 */
    const onClickSubmit = () => {
        if (textVal.trim()==="") return;
        else { const query = textVal.toLowerCase();
            navigate(`/productList?query=${query}&page=1`);
            setTextVal('');
        }
    }

    /* 검색단어와 일치하는 연관상품들을 검색창 아래에 띄워주는 기능 */
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
                // onBlur={(e)=>{if(e.key=='Enter')setInvisible(false)}}
                value={textVal}/>
            <button className="btnIcon" onClick={onClickSubmit}>
                <img className="icon" src="/public/images/to-look-for-icon-brown.jpg" height="25" />
            </button>
        </div>

        {/* 검색단어가 있을때만 연관상품창 띄움 */}
        {textVal.trim() !== "" && (
        <div>
            <ul className="searchLi">
                {searchLi}
            </ul>
        </div>
        )}
    </div>
)}//Search


