import {useSearchParams,NavLink} from 'react-router-dom';
import '../styles/ProductList.css';
import { useProduct } from '../context/ProductContext';


export default function ProductList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { product } = useProduct();
    const keyword = searchParams.get('query');

    let selectListArr = [{id: '', title:'', img:'' },];
    if(keyword!=="") {
        selectListArr = product.filter(({title})=>
        title.includes(searchParams.get('query'))
    )} else {
        selectListArr[0].title="없는 상품입니다.";
    }//if

//----------------------------------------------------------

    return (
    <> 
        <div>
            <h5>"{searchParams.get('query')}"검색 결과</h5>
        </div><br />
        <ProductFilter selectListArr={selectListArr}/>
    </>
)}//SearchResult



function ProductFilter({selectListArr}) {
    const productLi = selectListArr.map(({id, img, model, color, category, title, price})=>{
        return <li key={id}><NavLink to={'/productPage?id='+id}>
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
        <div>
            <button>전체</button>
            <button>아우터</button>
            <button>상의</button>
            <button>하의</button>
            <button>드레스</button>
            
            
            <ul className="productUl">
                {productLi}
            </ul>
        </div>
    </>
)}//productList