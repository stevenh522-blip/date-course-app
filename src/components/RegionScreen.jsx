import './RegionScreen.css';
import Button from './Button';

function RegionScreen () {
  return(
    <div className='region-screen'>
      <div className='region-header'>
        <span className='region-back'>‹</span>
        <div className='region-title'>어느 지역?</div>
        <span className='region-step'>2/5</span>
      </div>
      <div className='region-search'>
        <span className='search-icon'>🔍</span><input placeholder='오사카, 교토, 오키나와... (1회용 검색)'/>
      </div>
      <div className='region-card-header'>
        📍 내 지역
        <span className='region-card-sub'>
         (내정보 탭에서 추가·삭제)
        </span>
      </div>
      <div className='region-grid'>
        <div className='region-card selected'>🗼 도쿄 ✓</div>   
        <div className='region-card'>⛩️ 가나가와</div>          
        <div className='region-card'>🌸 사이타마</div>
      </div>
      <div className='guide'>탭 = 선택 표시 → [다음]으로 진행</div>
      <div className='guide'>목록에 없는 곳은 위 검색창에서 (내 목록엔 안 쌓임)</div>
      <div className='bottom-bar'>
        <Button text="다음 → 도쿄에서 고르기"/>
      </div>
    </div>
  )
}

export default RegionScreen;