import React from 'react';

const RelatedProducts = () => {
  // 1. 화면에 보여줄 상품 데이터 (이름, 가격, 이미지주소)
  const productList = [
    { id: 1, name: "키브 버튼 배색 레이어드 후드 가디건", price: "37.000원", img: "https://atimg.sonyunara.com/files/attrangs/goods/169087/696a6496e10ad.jpg" },
    { id: 2, name: "홀린 브러쉬 배색 스트라이프 카라넥 버튼 긴팔 니트", price: "27,800원", img: "https://atimg.sonyunara.com/files/attrangs/goods/168563/6921c8cc04c8f.jpg" },
    { id: 3, name: "헤어리 솔잎퍼 타이 세트 가디건", price: "28,800", img: "https://atimg.sonyunara.com/files/attrangs/goods/169071/696a270a8c383.jpg" },
    { id: 4, name: "올리아 모직 히든밴딩 기모 부츠컷 슬랙스", price: "35,500", img: "https://atimg.sonyunara.com/files/attrangs/goods/168931/6956b65c49d15.jpg" },
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