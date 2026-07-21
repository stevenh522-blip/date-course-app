import './DateTimeScreen.css'
import Button from './Button';

function DateTimeScreen () {
  return(
  <div className='datetime-screen'>
    <div className='datetime-header'>
      <span>‹</span>
      <div className='header-title'>언제 데이트해?</div>
      <span className='header-step'>1/5</span>
    </div>
    <div className='date-card'>
      📅 날짜
      <div className='month-nav'>
        <span>‹</span>
        <div>2026년 7월</div>
        <span>›</span>
      </div>
      <div className='weekdays'>
        <span className='sun'>일</span>
        <span>월</span>
        <span>화</span>
        <span>수</span>
        <span>목</span>
        <span>금</span>
        <span className='sat'>토</span>
      </div>
      <div className='days'>
        <span className='other-month'>28</span>
        <span className='other-month'>29</span>
        <span className='other-month'>30</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span className='sat'>4</span>
        <span className='sun'>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <span className='sat'>11</span>
        <span className='selected-day'>12</span>
        <span>13</span>
        <span>14</span>
        <span>15</span>
        <span>16</span>
        <span>17</span>
        <span className='sat'>18</span>
        <span className='sun'>19</span>
        <span>20</span>
        <span>21</span>
        <span>22</span>
        <span>23</span>
        <span>24</span>
        <span className='sat'>25</span>
        <span className='sun'>26</span>
        <span>27</span>
        <span>28</span>
        <span>29</span>
        <span>30</span>
        <span>31</span>
        <span className='other-month'>1</span>
      </div>
    </div>
    <div className='time-card'>
      <div className='time-title'>
        🕐 시간 <span className='time-sub'>(기본 12:00~23:00 · 안 바꿔도 됨)</span>
      </div>
      <div className='time-wheels'>
        <div className='wheel'>
          <div className='wheel-label'>시작</div>
          <div className='dim'>11:30</div>
          <div className='big'>12:00</div>
          <div className='dim'>12:30</div>
        </div>
        <div>~</div>
        <div className='wheel'>
          <div className='wheel-label'>끝</div>
          <div className='dim'>22:30</div>
          <div className='big'>23:00</div>
          <div className='dim'>23:30</div>
        </div>
      </div>
    </div>
    <div className='total-hours'>총 11시간 데이트 💕</div>
    <div className='guide'>‹ 뒤로 = 홈으로 (입력한 게 있으면 자동 임시저장)</div>
    <div className='guide'>날짜를 골라야 [다음]이 켜져요</div>
    <div className='bottom-bar'>
      <Button text="다음 → 어디로 갈까?"/>
    </div>
  </div>
  )
};

export default DateTimeScreen;