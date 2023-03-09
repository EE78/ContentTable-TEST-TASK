import { useState } from "react";
import "./PostsDataStyles.css";
import { usePosts } from "./model/usePosts";
import { Pagination } from "../Pagination/Pagination";
import { TableHead } from "../TableHead/TableHead";
import { PostContent } from "../PostContent/PostContent";
import { Search } from "../Search/Search";

const POSTS_PER_PAGE = 10;

export const PostsData = () => {
  const { posts } = usePosts();
  const [startPageIndex, setStartPageIndex] = useState(0);
  const [finalPageIndex, setFinalPageIndex] = useState(10);
  const [descIdSort, setDescIdSort] = useState(false);
  const handleIdSort = () => {
    setDescIdSort((prevState) => !prevState);
  };
  const [titleSort, setTitleSort] = useState(false);
  const handleTextSort = () => {
    setTitleSort((prevState) => !prevState);
  };
  const [bodySort, setBodySort] = useState(false);
  const handleBodySort = () => {
    setBodySort((prevState) => !prevState);
  };
  const [searchValue, setSearchValue] = useState("");
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

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue((event.target as HTMLInputElement).value);
  };
  const filteredData = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  const sortedData = filteredData.sort((next, prev) => {
    if (titleSort) {
      if (next.title.toLowerCase() < prev.title.toLowerCase()) {
        return -1;
      }
      return 1;
    }
    if (bodySort) {
      if (next.body.toLowerCase() < prev.body.toLowerCase()) {
        return -1;
      }
      return 1;
    }
    if (descIdSort) {
      return prev.id - next.id;
    }
    return next.id - prev.id;
  });
  const tableData = sortedData.slice(startPageIndex, finalPageIndex);

  const postsData = tableData.map((post) => {
    return (
      <PostContent
        key={post.id}
        postId={post.id}
        postTitle={post.title}
        postBody={post.body}
      />
    );
  });

  const pagesCount = Math.ceil(filteredData.length / POSTS_PER_PAGE);
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
  console.log(filteredData.length);

  return (
    <div>
      <Search onChange={searchHandler} />
      {filteredData.length !== 0 ? (
        <table>
          <TableHead
            onIdClick={handleIdSort}
            onTitleClick={handleTextSort}
            onBodyClick={handleBodySort}
          />
          <tbody>{postsData}</tbody>
        </table>
      ) : (
        <h1>NO DATA</h1>
      )}

      {filteredData.length > 10 ? (
        <Pagination
          onNextClick={showNextInfo}
          onPrevClick={showPrevInfo}
          content={pagination}
        />
      ) : null}
    </div>
  );
};
