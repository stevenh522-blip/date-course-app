import './Button.css';

function Button(props){
  return (
    <button className="main-btn">
      {props.text}
    </button>
  );
}

export default Button;