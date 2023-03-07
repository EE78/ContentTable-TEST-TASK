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
  // const [idSort, setIdSort] = useState(false);
  // const handleIdSort = () => {
  //   setIdSort(true);
  // };

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
  const postsElements = tableData.map((element) => {
    return (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.title}</td>
        <td>{element.body}</td>
      </tr>
    );
  });

  // const descendingId = posts.sort((prev, next) => next.id - prev.id);
  // console.log(descendingId);

  // const sortedById = descendingId.map((post) => {
  //   return post.id;
  // });
  // const ascendingId = posts.sort((prev, next) => prev.id - next.id);
  // console.log(ascendingId);
  // const alphabetSort = posts.sort((prev, next) => {
  //   if (prev.title < next.title) return -1;
  //   if (prev.title < next.title) return 1;
  // });

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
      <table>
        <TableHead />
        <tbody>
          {filteredData.length !== 0 ? (
            postsElements
          ) : (
            <tr>
              <td>NO DATA</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        onNextClick={showNextInfo}
        onPrevClick={showPrevInfo}
        content={filteredData.length !== 0 ? pagination : null}
      />
    </div>
  );
};
