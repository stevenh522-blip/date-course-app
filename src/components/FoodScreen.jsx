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

      <div className='place-search'>
        <span className='search-icon'>🔍</span>
        <input placeholder='우에노 오므라이스...' />
      </div>
    </div>
  );
}

export default FoodScreen;
