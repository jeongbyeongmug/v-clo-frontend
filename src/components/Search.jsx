// import ProductList from './ProductList'
// import Section from './Section'
import {useState, useRef, useEffect} from 'react'
import {useNavigate, NavLink} from 'react-router-dom'
import { useProduct } from '../context/ProductContext';


export default function Search() {
    const [textVal,setTextVal] = useState(''); /* 검색어 입력 이벤트용 선언*/
    const navigate = useNavigate(); /* 검색 결과로 주소 이동용*/
    const { product } = useProduct(); /* 상품 data 가져오기 */

    // const [invisible, setInvisible] = useState(false); /* 연관검색창 보이는 유&무 이벤트*/
    const searchRef = useRef(null);

    //외부 클릭 감지
    useEffect(()=> {
        const clickOutside = (e) => {
            if (searchRef.current && e.key=='Enter' && !searchRef.current.contains(e.target)) {
                setTextVal('');
            }//if
        };//clickOutside
        document.addEventListener('mousedown', clickOutside);
        return () => {
            document.removeEventListener('mousedown',clickOutside);
        };
    },[])//useEffect

    

    /* 검색창: 엔터, 혹은 버튼을 누르면 검색주소로 이동하는 이벤트 */
    const onClickSubmit = (e) => {
        if (textVal.trim()==="") return;
        else { const query = textVal.toLowerCase();
            // setTextVal('');
            navigate(`/productList?query=${query}&page=1`);
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
    <div id="search" ref={searchRef}>
        <div id="searchDiv">
            <input type="text" 
                onChange={(e)=> {
                    setTextVal(e.target.value); //검색어 입력할때마다 글자 자동 리랜더링
                }} 
                onKeyDown={(e)=> {
                    if(e.key=='Enter') {
                        onClickSubmit();
                    } // 엔터를 쳐도 주소 이동
                }} 
                // onFocus={()=> {setInvisible(true);}} //포커스가 다시 들어올때 기존 검색어 초기화
                value={textVal}/>
            <button className="btnIcon" onClick={onClickSubmit}> {/* 버튼을 누르면 주소 이동*/}
                <img className="icon" src="/public/images/to-look-for-icon-brown.jpg" height="25" />
            </button>
        </div>

        {/* 검색단어가 있을때만 연관상품창 띄움 */}
        <div>
            {textVal.trim() !== "" && (
                <ul className="searchLi">
                    {searchLi}
                </ul>
            )}
        </div>
    </div>
)}//Search
