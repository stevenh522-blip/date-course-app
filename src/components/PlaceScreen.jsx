import './PlaceScreen.css';
import PlaceCard from './PlaceCard';
import Button from './Button';

// 가짜 검색 결과 — Place 타입 그대로 (실데이터는 Phase 5 구글 API)
const museum = {
  id: 'p1',
  name: '국립과학박물관',
  category: '박물관',
  region: '우에노',
  rating: 4.5,
  priceLevel: '¥¥',
  closingTime: '~17시',
  photo: null,
  website: null,
  url: 'https://maps.google.com/?cid=1',
  memo: '',
  isManual: false,
};

const artMuseum = {
  id: 'p2',
  name: '국립서양미술관',
  category: '미술관',
  region: '우에노',
  rating: 4.5,
  priceLevel: '¥¥',
  closingTime: '~20시',
  photo: null,
  website: null,
  url: 'https://maps.google.com/?cid=2',
  memo: '',
  isManual: false,
};

function PlaceScreen() {
  return (
    <div className='place-screen'>
      <div className='place-header'>
        <span className='place-back'>‹</span>
        <div className='place-title'>도쿄 · 갈 곳 고르기</div>
        <span className='place-step'>3/5</span>
      </div>
      <div className='place-search'>
        <span className='search-icon'>🔍</span>
        <input placeholder='이케부쿠로 넷카페, 쇼와기념공원...' />
      </div>
      <div className='place-allergy'>
        <span>💝 갑각류 알레르기 · 조용한 곳 좋아함</span>
        <span className='place-allergy-arrow'>▾</span>
      </div>
      <div className='place-chips'>
        <div className='place-chip on-dark'>📍우에노</div>
        <div className='place-chip'>시부야</div>
        <div className='place-chip'>신주쿠</div>
        <div className='place-chip add'>+ 추가</div>
      </div>
      <div className='place-chips'>
        <div className='place-chip on-pink'>🎯볼거리</div>
        <div className='place-chip'>체험</div>
        <div className='place-chip'>공원</div>
        <div className='place-chip'>쇼핑</div>
      </div>
      <div className='place-fav-pick'>⭐ 즐겨찾기에서 담기</div>
      <PlaceCard
        place={museum}
        meta={`⭐${museum.rating} · ${museum.closingTime} · ${museum.priceLevel}`}
        emoji='🌳'
        gradient='linear-gradient(135deg, #a8d8a8, #88c888)'
        isFavorited={true}
        isAdded={true}
      />
      <PlaceCard
        place={artMuseum}
        meta={`⭐${artMuseum.rating} · ${artMuseum.closingTime} · ${artMuseum.priceLevel}`}
        emoji='🎨'
        gradient='linear-gradient(135deg, #c8a8ff, #a888ff)'
        isFavorited={false}
        isAdded={false}
      />
      <div className='bottom-bar'>
        <span className='place-count'>담은 곳 <b>1곳</b></span>
        <Button text='다음 (0곳이어도 OK)' />
      </div>
    </div>
  );
}

export default PlaceScreen;
