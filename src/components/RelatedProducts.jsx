import React from 'react';

const RelatedProducts = () => {
  const productList = [
    { id: 1, name: "트위드 카라 긴팔 롱 원피스", price: "96,000", img: "https://atimg.sonyunara.com/files/attrangs/goods/167487/list13_68db2731b5fa0.gif" },
    { id: 2, name: "브러쉬 배색 스트라이프 긴팔 니트", price: "32,700", img: "https://atimg.sonyunara.com/files/attrangs/goods/168563/list13_6921c8d6bf4dd.gif" },
    { id: 3, name: "브이벤 후드 배색 루즈핏 체크 셔츠", price: "28,800", img: "https://atimg.sonyunara.com/files/attrangs/goods/168191/list13_690229b3ea2f7.gif" },
    { id: 4, name: "하트넥 배색 크롭 블라우스", price: "62,900", img: "https://atimg.sonyunara.com/files/attrangs/goods/158732/list13_6972631f069a2.gif" },
  ];

  return (
    <div style={{ padding: '40px 0' }}>
      <h3 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: 'bold' }}>
        함께 많이 본 상품들
      </h3>

      <div style={{ display: 'flex', gap: '15px' }}>
        
        {/* 3. map을 돌려서 상품 개수만큼 반복 생성 */}
        {productList.map((item) => (
          <div key={item.id} style={{ width: '25%', cursor: 'pointer' }}>
            
            {/* 상품 이미지 */}
            <div style={{ width: '100%', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
              <img src={item.img} alt={item.name} style={{ width: '100%', display: 'block' }} />
            </div>

            {/* 상품 정보 (이름, 가격) */}
            <div style={{ marginTop: '10px' }}>
              <p style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>{item.name}</p>
              <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{item.price}원</p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default RelatedProducts;