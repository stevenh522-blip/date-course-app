import './DraftCard.css'

function DraftCard () {
  return (
    <div className='draft-card'>
      <span className='draft-icon'>✍️</span>
      <div className='draft-contents'>
        <h3>만드는 중 · 타치카와</h3>
        <p>임시본</p>
      </div>
      <span className='draft-close'>✕</span>
    </div>
  )
}

export default DraftCard