import React, { useState, useEffect } from "react";
import { MainTableWrapper } from "../../shared/UI/Styled";

const baseUrl = "https://jsonplaceholder.typicode.com/posts";

export default function MainTable() {
  const [elemInfo, setElemInfo] = useState([]);
  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => setElemInfo(data));
    console.log(elemInfo);
  }, []);

  const tableData = elemInfo.map((element: any) => {
    return (
      <tr>
        <td>{element.id}</td>
        <td>{element.title}</td>
        <td>{element.body}</td>
        </tr>
    );
  });

  return (
    <MainTableWrapper>
      <table>
        <thead>
          <tr>
            <th>
              ID <button>SORT</button>
            </th>
            <th>
              Заголовок <button>SORT</button>
            </th>
            <th>
              Описание <button>SORT</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData}

        </tbody>
      </table>
    </MainTableWrapper>
  );
}
