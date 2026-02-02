import { createContext, useContext, useState } from 'react';
import productData from '../data/Product.json'

//1. 컨텍스트 객체 생성
const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [product, setProduct] = useState(productData);

    return (
    <ProductContext.Provider value={{ product, setProduct }}>
        {children}
    </ProductContext.Provider>
)}//ProductProvider

export function useProduct() {
    return useContext(ProductContext);
}