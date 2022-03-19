import s from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="submit" className={s.Button} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
