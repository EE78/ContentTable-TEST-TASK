import React, { useState, useEffect } from "react";
import "./styles.css";

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

  const setPage1 = () => {
    setInitPage(0);
    setEndPage(10);
  };
  const setPage2 = () => {
    setInitPage(10);
    setEndPage(20);
  };
  const setPage3 = () => {
    setInitPage(20);
    setEndPage(30);
  };
  const setPage4 = () => {
    setInitPage(30);
    setEndPage(40);
  };
  const setPage5 = () => {
    setInitPage(40);
    setEndPage(50);
  };
  const setPage6 = () => {
    setInitPage(50);
    setEndPage(60);
  };
  const setPage7 = () => {
    setInitPage(60);
    setEndPage(70);
  };
  const setPage8 = () => {
    setInitPage(70);
    setEndPage(80);
  };
  const setPage9 = () => {
    setInitPage(80);
    setEndPage(90);
  };
  const setPage10 = () => {
    setInitPage(90);
    setEndPage(100);
  };

  // const arrOfId = elemInfo.map((item: any) => {
  //   return item.id;
  // });
  // const sortId = () => {
  //   arrOfId.sort((a, b) => b - a);
  // };
  const tableData = filteredData
    .slice(initPage, endPage)
    .map((element: any) => {
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
            <th>ID</th>
            <th>Заголовок</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
      <div className="controllers">
        <button className="change-page__button" onClick={showPrevInfo}>
          Назад
        </button>

        <ul>
          <li onClick={setPage1}>1</li>
          <li onClick={setPage2}>2</li>
          <li onClick={setPage3}>3</li>
          <li onClick={setPage4}>4</li>
          <li onClick={setPage5}>5</li>
          <li onClick={setPage6}>6</li>
          <li onClick={setPage7}>7</li>
          <li onClick={setPage8}>8</li>
          <li onClick={setPage9}>9</li>
          <li onClick={setPage10}>10</li>
        </ul>

        <button className="change-page__button" onClick={showNextInfo}>
          Далее
        </button>
      </div>
    </div>
  );
};

export { TableData };
