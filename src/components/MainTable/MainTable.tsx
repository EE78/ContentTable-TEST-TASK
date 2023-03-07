import { useState } from "react";
import { PostsData } from "../PostsData/PostsData";
import "./MainTable.styles.css";

export const MainTable = () => {
  const [searchString, setSearchString] = useState("");

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Поиск"
        onChange={inputHandler}
        value={searchString}
      />
      <PostsData searchString={searchString} />
    </>
  );
};
