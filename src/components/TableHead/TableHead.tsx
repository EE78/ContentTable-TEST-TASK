import React from "react";
import "./TableHeadStyles.css";

export const TableHead = () => {
  return (
    <thead>
      <tr>
        <th className="table-head_id-header">ID</th>
        <th className="table-head_other-header">Заголовок</th>
        <th className="table-head_other-header">Описание</th>
      </tr>
    </thead>
  );
};
