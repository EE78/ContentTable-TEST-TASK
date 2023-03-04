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

  const tableData = filteredData.map((element: any) => {
    return (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.title}</td>
        <td>{element.body}</td>
      </tr>
    );
  });

  return <tbody>{tableData}</tbody>;
};

export { TableData };
