import { useEffect, useState } from "react";
import { Search } from "../Search/Search";
import { usePosts } from "./model/usePosts";
import { Pagination } from "../Pagination/Pagination";
import { TableHead } from "../TableHead/TableHead";
import { PostContent } from "../PostContent/PostContent";
import "./PostsDataStyles.css";

const POSTS_PER_PAGE = 10;
const setLocation = (curLoc: any) => {
  try {
    //@ts-ignore
    window.history.pushState(null, null, curLoc);
    return;
  } catch (e) {}
  window.location.hash = "#" + curLoc;
};
const applyFilters = (postsToFilter: any, filterOptions: any) => {
  const filteredPosts = [...postsToFilter]
    .sort((next, prev) => {
      return filterOptions.idSort ? prev.id - next.id : next.id - prev.id;
    })
    .sort((next, prev) => {
      if (filterOptions.titleSort) {
        if (next.title.toLowerCase() < prev.title.toLowerCase()) {
          return -1;
        }
      }
      if (filterOptions.bodySort) {
        if (next.body.toLowerCase() < prev.body.toLowerCase()) {
          return -1;
        }
      }
      return 1;
    })
    .filter((post) => {
      return (
        post.body.includes(filterOptions.searchString) ||
        post.title.includes(filterOptions.searchString)
      );
    });
  return filteredPosts;
};

export const PostsData = () => {
  const { posts } = usePosts();
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isIdSorted, setIsIdSorted] = useState(false);
  const [isBodySorted, setIsBodySorted] = useState(false);
  const [isTitleSorted, setIsTitleSorted] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const topSliceBorder = activePage * POSTS_PER_PAGE;
  const bottomSliceBorder = activePage * POSTS_PER_PAGE - 10;

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue((event.target as HTMLInputElement).value);
  };
  const idSortHandler = () => {
    setIsIdSorted((prevState) => !prevState);
  };
  const bodySortHandler = () => {
    setIsBodySorted((prevState) => !prevState);
  };
  const titleSortHandler = () => {
    setIsTitleSorted((prevState) => !prevState);
  };
  const showNextPage = () => {
    setActivePage(activePage + 1);
    setLocation("/page=" + (activePage + 1));
    if (activePage === pagesCount) {
      setActivePage(Math.max(pagesCount));
      setLocation("/page=" + Math.max(pagesCount));
    }
  };
  const showPrevPage = () => {
    setActivePage(activePage - 1);
    setLocation("/page=" + (activePage - 1));
    if (activePage === 1) {
      setActivePage(1);
      setLocation("/page=1");
    }
  };
  const pagesCount = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const arrOfPageButtons = new Array(pagesCount).fill(0);
  const pagination = arrOfPageButtons.map((button, index) => {
    return (
      <button
        key={index}
        className="list-buttons"
        style={{
          border: activePage === index + 1 ? "3px solid green" : "none",
        }}
        onClick={() => {
          setActivePage(index + 1);
          setLocation("/page=" + (index + 1));
        }}
      >
        {index + 1}
      </button>
    );
  });
  useEffect(() => {
    const options = {
      searchString: searchValue,
      page: activePage,
      idSort: isIdSorted,
      bodySort: isBodySorted,
      titleSort: isTitleSorted,
    };
    //@ts-ignore
    setFilteredPosts(applyFilters(posts, options));
  }, [searchValue, activePage, isIdSorted, isBodySorted, isTitleSorted, posts]);
  const postsData = filteredPosts
    .slice(bottomSliceBorder, topSliceBorder)
    .map((post: any) => {
      return (
        <PostContent
          key={post.id}
          postId={post.id}
          postTitle={post.title}
          postBody={post.body}
        />
      );
    });

  return (
    <div>
      <Search onChange={searchHandler} />
      {filteredPosts.length === 0 ? (
        <h1>NO DATA</h1>
      ) : (
        <table>
          <TableHead
            onIdClick={idSortHandler}
            onBodyClick={bodySortHandler}
            onTitleClick={titleSortHandler}
          />

          <tbody>{postsData}</tbody>
        </table>
      )}
      {filteredPosts.length > 10 ? (
        <Pagination
          content={pagination}
          onNextClick={showNextPage}
          onPrevClick={showPrevPage}
        />
      ) : null}
    </div>
  );
};
