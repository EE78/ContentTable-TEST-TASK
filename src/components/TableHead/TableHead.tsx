import "./TableHeadStyles.css";
// @ts-ignore
import sortArrow from "./images/sortArrow.png";

export const TableHead = ({ onIdClick, onTitleClick, onBodyClick }: any) => {
  return (
    <thead>
      <tr>
        <th onClick={onIdClick} className="table-head_id-header">
          ID
          <img src={sortArrow} alt="sort by id"></img>
        </th>
        <th onClick={onTitleClick} className="table-head_other-header">
          Заголовок
        </th>
        <th onClick={onBodyClick} className="table-head_other-header">
          Описание
        </th>
      </tr>
    </thead>
  );
};
