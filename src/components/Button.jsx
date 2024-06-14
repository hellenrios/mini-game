import '../styles/Button.css'

const Button = ({ onClick, children  }) => {
    return (
      <button className='button' onClick={onClick}>
        <p>{children}</p>
      </button>
    );
  };
  
export default Button





