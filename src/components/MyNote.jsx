import './MyNote.css';
import GirlfriendInfo from './GirlfriendInfo';
import { useState } from 'react';

function MyNote () {
  const anniversaries = [
    { id: "a1", title: "여친 생일", date: "2026-07-20", repeat: true },
  ];

  const todos = [
    { id: "t1", text: "생일 선물 예약하기", done: false },
    { id: "t2", text: "목도리 사기", done: true },
  ];

  const [selected, setSelected] = useState(null);

  return(
    <section className='my-note'>
      <h2>📌 마이 노트</h2>
      <h3>🎂 기념일<button className='plus-button'>+</button></h3>
      {anniversaries.map((item)=>(
        <p key={item.id} onClick={()=> {setSelected(item.id)}}>
          {item.title}
          <span className='dday'>D-16</span>
          <span className='badge'>🔁매년</span>
          {selected === item.id ? <span>✏️🗑️</span> : null}
        </p>
      ))}

      <h3>✅ 할 일<button className='plus-button'>+</button></h3>
      {todos.map((todo)=>(
        <p key={todo.id} onClick={()=> {setSelected(todo.id)}}>
          <span className={todo.done ? "check-done" : "" }>{todo.done ? "☑" : "☐"}</span>
          <span className={todo.done ? "todo-done" : "" }>{todo.text}</span> 
          {selected === todo.id ? <span>✏️🗑️</span> : null}
        </p>
      ))}

      <h3>💝 여친 정보<button className='plus-button'>+</button></h3>
      <GirlfriendInfo selected={selected} setSelected={setSelected}/>
    </section>
  );
}

export default MyNote;