import React, { useState } from "react";
import { TableData } from "../TableData/TableData";

export default function MainTable() {
  const [searchString, setSearchString] = useState("");

  let inputHandler = (e: any) => {
    setSearchString(e.target.value);
  };

  return (
    <>
      <label htmlFor="names">Поиск персонажей</label>
      <br />
      <input
        id="names"
        type="text"
        placeholder="Поиск"
        onChange={inputHandler}
        value={searchString}
      />
      <TableData input={searchString} />
    </>
  );
}
