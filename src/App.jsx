import Button from './components/Button';
import TabBar from './components/TabBar';
import Header from './components/Header';
import GirlfriendInfo from './components/GirlfriendInfo';
import MyNote from './components/MyNote';
import CourseList from './components/CourseList';
import DateTimeScreen from './components/DateTimeScreen';
import RegionScreen from './components/RegionScreen';

function App(){
    return (
      <div>
        {/* 화면1 대조용 임시 — 홈 부품은 Phase 3에서 화면전환 붙일 때 살림 */}
        {/* <Header/> */}
        {/* <MyNote/> */}
        {/* <DateTimeScreen/> */}
        <RegionScreen/>
        {/* <Button text="+ 새 데이트 코스 만들기"/> */}
        {/* <CourseList/> */}
        {/* <TabBar/> */}
      </div>
    );    
}

export default App;