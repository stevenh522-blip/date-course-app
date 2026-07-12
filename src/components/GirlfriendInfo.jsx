import './GirlfriendInfo.css'

function GirlfriendInfo () {
  const infos = [
    { text: "갑각류 알르레기" },
    { text: "단 거 좋아함" },
  ];

  return (
    <div className='gf-info'>
      {infos.map((info)=> (
        <p>💝{info.text}</p>
      ))}
    </div>
  );
}

export default GirlfriendInfo;