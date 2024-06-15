import '../styles/Button.css'

const Button = ({ onClick, children  }) => (
      <button className='button' onClick={onClick}>
        <p>{children}</p>
      </button>
);

export default Button