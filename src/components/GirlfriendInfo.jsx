import './GirlfriendInfo.css'

function GirlfriendInfo ({selected, setSelected}) {
  const infos = [
    { id: "g1", text: "갑각류 알레르기" },
    { id: "g2", text: "단 거 좋아함" },
  ];

  return (
    <div className='gf-info'>
      {infos.map((info)=> (
        <p key={info.id} onClick={()=> setSelected(info.id)} className={selected === info.id ? "selected" : ""}> 
          {info.text} 
          {selected === info.id ? <span>✏️🗑️</span> : null}
        </p>
      ))}
    </div>
  );
}

export default GirlfriendInfo;