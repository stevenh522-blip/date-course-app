import './MyNote.css';
import GirlfriendInfo from './GirlfriendInfo';

function MyNote () {
  const anniversaries = [
    { title: "여친 생일", date: "2026-07-20", repeat: true },
  ];

  const todos = [
    { text: "생일 선물 예약하기", done: false },
    { text: "목도리 사기", done: true },
  ];

  return(
    <section className='my-note'>
      <h2>📌 마이 노트</h2>
      <h3>🎂 기념일<button className='plus-button'>+</button></h3>
      {anniversaries.map((item)=>(
        <p>{item.title} <span className='dday'>D-16</span> <span className='badge'>🔁매년</span></p>
      ))}

      <h3>✅ 할 일<button className='plus-button'>+</button></h3>
      {todos.map((todo)=>(
        <p>
          <span className={todo.done ? "check-done" : "" }>{todo.done ? "☑" : "☐"}</span>
          <span className={todo.done ? "todo-done" : "" }>{todo.text}</span>
        </p>
      ))}

      <h3>💝 여친 정보<button className='plus-button'>+</button></h3>
      <GirlfriendInfo/>
    </section>
  );
}

export default MyNote;