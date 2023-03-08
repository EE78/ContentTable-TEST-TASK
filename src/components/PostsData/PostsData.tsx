import { useState } from "react";
import "./PostsDataStyles.css";
import { usePosts } from "./model/usePosts";
import IProps from "./interfaces/IProps";
import { Pagination } from "../Pagination/Pagination";
import { TableHead } from "../TableHead/TableHead";
import { PostContent } from "../PostContent/PostContent";

const POSTS_PER_PAGE = 10;

export const PostsData: React.FC<IProps> = (props) => {
  const { posts } = usePosts();
  const [startPageIndex, setStartPageIndex] = useState(0);
  const [finalPageIndex, setFinalPageIndex] = useState(10);
  const [descIdSort, setDescIdSort] = useState(false);
  const handleSort = () => {
    setDescIdSort((prevState) => !prevState);
  };

  const showNextInfo = () => {
    setStartPageIndex(startPageIndex + 10);
    setFinalPageIndex(finalPageIndex + 10);
    if (startPageIndex > 80 && finalPageIndex > 99) {
      setStartPageIndex(90);
      setFinalPageIndex(100);
    }
  };
  const showPrevInfo = () => {
    setStartPageIndex(startPageIndex - 10);
    setFinalPageIndex(finalPageIndex - 10);
    if (startPageIndex < 10 && finalPageIndex < 20) {
      setStartPageIndex(0);
      setFinalPageIndex(10);
    }
  };
  const filteredData = posts.filter((el) => {
    if (props.searchString === "") {
      return el;
    } else {
      return el.title.includes(props.searchString);
    }
  });

  const tableData = filteredData.slice(startPageIndex, finalPageIndex);
  const sortedData = tableData.sort((next, prev) => {
    if (descIdSort) {
      return prev.id - next.id;
    }
    return next.id - prev.id;
  });
  const postsElements = sortedData.map((element) => {
    return (
      <PostContent
        key={element.id}
        postId={element.id}
        postTitle={element.title}
        postBody={element.body}
      />
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
          setStartPageIndex((index + 1) * 10 - 10);
          setFinalPageIndex((index + 1) * 10);
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
          <TableHead onClick={handleSort} />
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
