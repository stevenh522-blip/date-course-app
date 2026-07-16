import './TabBar.css';

function TabBar (){
  return (<nav className="tab-bar">
    <button className='active'>
      <span className='tab-icon'>🏠</span>
      <span className='tab-label'>홈</span>
    </button>

    <button>
      <span className='tab-icon'>🗺️</span> 
      <span className='tab-label'>코스</span>
    </button>

    <button>
      <span className='tab-icon'>⭐</span> 
      <span className='tab-label'>즐겨찾기</span>
    </button>

    <button>
      <span className='tab-icon'>👤</span> 
      <span className='tab-label'>내정보</span>
    </button>

  </nav>)
};

export default TabBar;