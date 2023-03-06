import React, { useState, useEffect } from "react";

const baseUrl = "https://jsonplaceholder.typicode.com/posts";

const TableData = (props: any) => {
  const [elemInfo, setElemInfo] = useState([]);
  const filteredData = elemInfo.filter((el: any) => {
    if (props.input === "") {
      return el;
    } else {
      return el.title.includes(props.input);
    }
  });

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((result) => setElemInfo(result));
  }, []);

  const [initPage, setInitPage] = useState(0);
  const [endPage, setEndPage] = useState(10);
  const showNextInfo = () => {
    setInitPage(initPage + 10);
    setEndPage(endPage + 10);
    if (initPage > 80 && endPage > 99) {
      setInitPage(90);
      setEndPage(100);
    }
  };
  const showPrevInfo = () => {
    setInitPage(initPage - 10);
    setEndPage(endPage - 10);
    if (initPage < 10 && endPage < 20) {
      setInitPage(0);
      setEndPage(10);
    }
  };

  const tableData = filteredData.slice(initPage, endPage).map((element: any) => {
    return (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.title}</td>
        <td>{element.body}</td>
      </tr>
    );
  });

  return (
    <div>
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
        <tbody>{tableData}</tbody>
      </table>
      <button onClick={showPrevInfo}>PREV</button>
      <button onClick={showNextInfo}>NEXT</button>
    </div>
  );
};

export { TableData };
