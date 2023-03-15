import "./PaginationStyles.css";

export const Pagination = ({ onNextClick, onPrevClick, content, setNextUrl }: any) => {
  return (
    <div className="controllers">
      <button className="controllers__button" onClick={onPrevClick}>
        Назад
      </button>
      <div>{content}</div>
      <button className="controllers__button" onClick={onNextClick}>
        Далее
      </button>
    </div>
  );
};
