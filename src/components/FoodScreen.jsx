import './PlaceScreen.css';   // 공통 껍데기 재활용 (place-header, place-search, place-chips...)
import './FoodScreen.css';    // 이 화면 전용: 지도 · 가격행 · 카테고리칩
import PlaceCard from './PlaceCard';
import Button from './Button';

// 가짜 맛집 — Place 타입 그대로 (실데이터는 Phase 5 구글 API)
const ichiran = {
  id: 'f1',
  name: '이치란 아사쿠사점',
  category: '라멘',
  region: '아사쿠사',
  rating: 4.3,
  priceLevel: '¥¥',
  closingTime: null,   // 도보 4분은 계산값 → meta에서 따로. 여기엔 안 넣음
  photo: null,
  website: null,
  url: 'https://maps.google.com/?cid=10',
  memo: '',
  isManual: false,
};

function FoodScreen() {
  return (
    <div className='place-screen'>
      <div className='place-header'>
        <span className='place-back'>‹</span>
        <div className='place-title'>맛집 찾기</div>
        <span className='place-step'>4/5</span>
      </div>

      <div className='food-near-label'>어느 장소 근처?</div>
      <div className='place-chips'>
        <div className='place-chip on-dark'>🏮 가미나리몬</div>
        <div className='place-chip'>🌳 과학박물관</div>
      </div>

      {/* s3 원본은 흰 박스지만 핑크 강조본(.place-search) 재활용 — 검색창 통일감 위해 의도적 오버라이드 */}
      <div className='place-search'>
        <span className='search-icon'>🔍</span>
        <input placeholder='우에노 오므라이스...' />
      </div>

      {/* 지도 자리 — Phase 5에서 구글 지도로 교체. 지금은 공간 차지용 빈 박스 */}
      <div className='food-map'></div>

      {/* 카테고리 칩 — ✓ 붙은 게 켜짐(핑크). 나중에 카테고리 추가되면 아랫줄로 접힘 */}
      <div className='place-chips'>
        <div className='food-cat on'>🍜 라멘 ✓</div>
        <div className='food-cat'>🍣 스시</div>
        <div className='food-cat on'>☕ 카페 ✓</div>
        <div className='food-cat'>🍺 이자카야</div>
      </div>

      {/* 가격 필터 — 탭하면 ¥ 칩 펼침. 토글·필터 효과는 Phase 5(실데이터). 지금은 트리거만 */}
      <div className='food-price'>💰 가격 ▾</div>

      {/* ⭐ 즐겨찾기에서 담기 — 화면2 부품 스타일 재활용 */}
      <div className='place-fav-pick'>⭐ 즐겨찾기에서 담기</div>

      <PlaceCard
        place={ichiran}
        meta={`⭐${ichiran.rating} · 도보 4분 · ${ichiran.priceLevel}`}
        emoji='🍜'
        gradient='linear-gradient(135deg, #ffd8a8, #ffb878)'
        isFavorited={false}
        isAdded={false}
      />

      {/* 하단바 — 화면2와 동일 방식. 라벨의 "0곳이어도 OK"로 건너뛰기 대체(별도 버튼·스왑 없음) */}
      <div className='bottom-bar'>
        <span className='place-count'>담은 맛집 <b>1곳</b></span>
        <Button text='코스 완성 → (0곳이어도 OK)' />
      </div>
    </div>
  );
}

export default FoodScreen;
