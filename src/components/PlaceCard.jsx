import './PlaceCard.css';

function PlaceCard(props) {
  const place = props.place;
  return (
    <div className='place-card'>
      <div className={props.isFavorited ? 'place-fav faved' : 'place-fav'}>
        {props.isFavorited ? '★' : '☆'}
      </div>
      <div className='place-thumb' style={{ background: props.gradient }}>
        {props.emoji}
      </div>
      <div className='place-info'>
        <div className='place-name'>{place.name}</div>
        <div className='place-meta'>⭐{place.rating} · {place.closingTime} · {place.priceLevel}</div>
      </div>
      <div className={props.isAdded ? 'place-add added' : 'place-add'}>
        {props.isAdded ? '담김 ✓' : '+'}
      </div>
    </div>
  );
}

export default PlaceCard;
