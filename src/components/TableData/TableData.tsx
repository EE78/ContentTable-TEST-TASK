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

  const arrOfPageButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const pageButtons = arrOfPageButtons.map((button: any) => {
    return (
      <button className="list-buttons"
        onClick={() => {
          if (button === 1) {
            setInitPage(0);
            setEndPage(10);
          }
          if (button === 2) {
            setInitPage(10);
            setEndPage(20);
          }
          if (button === 3) {
            setInitPage(20);
            setEndPage(30);
          }
          if (button === 4) {
            setInitPage(30);
            setEndPage(40);
          }
          if (button === 5) {
            setInitPage(40);
            setEndPage(50);
          }

          if (button === 6) {
            setInitPage(50);
            setEndPage(60);
          }
          if (button === 7) {
            setInitPage(60);
            setEndPage(70);
          }
          if (button === 8) {
            setInitPage(70);
            setEndPage(80);
          }
          if (button === 9) {
            setInitPage(80);
            setEndPage(90);
          }
          if (button === 10) {
            setInitPage(90);
            setEndPage(100);
          }
        }}
      >
        {button}
      </button>
    );
  });
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

        <div>{pageButtons}</div>

        <button className="change-page__button" onClick={showNextInfo}>
          Далее
        </button>
      </div>
    </div>
  );
};

export { TableData };
