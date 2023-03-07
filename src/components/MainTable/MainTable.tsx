import { useState } from "react";
import { TableData } from "../TableData/TableData";
import "./MainTable.styles.css";

export const MainTable = () => {
  const [searchString, setSearchString] = useState("");

  const inputHandler = (e: any) => {
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
};
