import './GirlfriendInfo.css'

function GirlfriendInfo () {
  const infos = [
    { id: "g1", text: "갑각류 알르레기" },
    { id: "g2", text: "단 거 좋아함" },
  ];

  return (
    <div className='gf-info'>
      {infos.map((info)=> (
        <p key={info.id}>💝{info.text}</p>
      ))}
    </div>
  );
}

export default GirlfriendInfo;