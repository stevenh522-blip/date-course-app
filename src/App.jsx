import Button from './components/Button';
import TabBar from './components/TabBar';
import Header from './components/Header';
import GirlfriendInfo from './components/GirlfriendInfo';
import MyNote from './components/MyNote';
import CourseList from './components/CourseList';

function App(){
    return (
      <div>
        <Header/>
        <MyNote/>
        <Button text="+ 새 데이트 코스 만들기"/>
        <CourseList/>
        <TabBar/>
      </div>
    );    
}

export default App;