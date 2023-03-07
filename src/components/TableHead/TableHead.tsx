import "./TableHeadStyles.css";
// @ts-ignore
import sortArrow from "./images/sortArrow.png";

export const TableHead = ({ onClick }: any) => {
  return (
    <thead>
      <tr>
        <th className="table-head_id-header">
          ID
          <img src={sortArrow} onClick={onClick} alt="sort by id"></img>
        </th>
        <th className="table-head_other-header">Заголовок</th>
        <th className="table-head_other-header">Описание</th>
      </tr>
    </thead>
  );
};
