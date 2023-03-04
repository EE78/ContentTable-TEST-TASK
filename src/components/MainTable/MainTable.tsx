import React, { useState, useEffect } from "react";
import { MainTableWrapper } from "../../shared/UI/Styled";
import { TableData } from "../TableData/TableData";

export default function MainTable() {
  const [searchString, setSearchString] = useState(" ");

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
          <TableData input={searchString}/>
        </table>
      </MainTableWrapper>
    </>
  );
}
