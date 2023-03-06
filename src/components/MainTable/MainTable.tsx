import React, { useState } from "react";
import { TableData } from "../TableData/TableData";
import "./styles.css";

export default function MainTable() {
  const [searchString, setSearchString] = useState("");

  let inputHandler = (e: any) => {
    setSearchString(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Поиск"
        onChange={inputHandler}
        value={searchString}
      />
      <TableData input={searchString} />
    </>
  );
}
