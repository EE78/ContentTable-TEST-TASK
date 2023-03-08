import { useState } from "react";
import "./PostsDataStyles.css";
import { usePosts } from "./model/usePosts";
import IProps from "./interfaces/IProps";
import { Pagination } from "../Pagination/Pagination";
import { TableHead } from "../TableHead/TableHead";

const POSTS_PER_PAGE = 10;

export const PostsData: React.FC<IProps> = (props) => {
  const { posts } = usePosts();
  const [startIndex, setStartIndex] = useState(0);
  const [finalIndex, setFinalIndex] = useState(10);
  const [idSort, setIdSort] = useState(false);
  const handleIdSort = () => {
    setIdSort((prevState) => !prevState);
  };

  const showNextInfo = () => {
    setStartIndex(startIndex + 10);
    setFinalIndex(finalIndex + 10);
    if (startIndex > 80 && finalIndex > 99) {
      setStartIndex(90);
      setFinalIndex(100);
    }
  };
  const showPrevInfo = () => {
    setStartIndex(startIndex - 10);
    setFinalIndex(finalIndex - 10);
    if (startIndex < 10 && finalIndex < 20) {
      setStartIndex(0);
      setFinalIndex(10);
    }
  };
  const filteredData = posts.filter((el) => {
    if (props.searchString === "") {
      return el;
    } else {
      return el.title.includes(props.searchString);
    }
  });

  const tableData = filteredData.slice(startIndex, finalIndex);
  // @ts-ignore
  const sortedData = tableData.sort((next, prev) => {
    if (idSort) {
      return prev.id - next.id;
    }
    return next.id - prev.id;
  });
  const postsElements = sortedData.map((element) => {
    return (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.title}</td>
        <td>{element.body}</td>
      </tr>
    );
  });

  const pagesCount = Math.round(posts.length / POSTS_PER_PAGE);
  const arrOfPageButtons = new Array(pagesCount).fill(0);
  const pagination = arrOfPageButtons.map((button, index) => {
    return (
      <button
        key={index}
        className="list-buttons"
        onClick={() => {
          setStartIndex((index + 1) * 10 - 10);
          setFinalIndex((index + 1) * 10);
        }}
      >
        {index + 1}
      </button>
    );
  });

  return (
    <div>
      {filteredData.length !== 0 ? (
        <table>
          <TableHead onClick={handleIdSort} />
          <tbody>{postsElements}</tbody>
        </table>
      ) : (
        <h1>NO DATA</h1>
      )}

      {filteredData.length !== 0 ? (
        <Pagination
          onNextClick={showNextInfo}
          onPrevClick={showPrevInfo}
          content={pagination}
        />
      ) : null}
    </div>
  );
};
