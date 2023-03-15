import { useEffect, useState } from "react";
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
  // const [titleSort, setTitleSort] = useState(false);
  // const handleTextSort = () => {
  //   setTitleSort((prevState) => !prevState);
  // };
  // const [bodySort, setBodySort] = useState(false);
  // const handleBodySort = () => {
  //   setBodySort((prevState) => !prevState);
  // };
  const [searchValue, setSearchValue] = useState("");
  const showNextInfo = () => {
    setStartPageIndex(startPageIndex + 10);
    setFinalPageIndex(finalPageIndex + 10);
    setLocation("page=" + (finalPageIndex / 10 + 1));
    if (startPageIndex / 10 + 2 >= 11) {
      setLocation("page=10");
    }
    if (startPageIndex > 80 && finalPageIndex > 99) {
      setStartPageIndex(90);
      setFinalPageIndex(100);
    }
  };
  const showPrevInfo = () => {
    setStartPageIndex(startPageIndex - 10);
    setFinalPageIndex(finalPageIndex - 10);
    setLocation("page=" + startPageIndex / 10);
    if (startPageIndex / 10 === 0) {
      setLocation("page=1");
    }
    if (startPageIndex < 10 && finalPageIndex < 20) {
      setStartPageIndex(0);
      setFinalPageIndex(10);
    }
  };

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue((event.target as HTMLInputElement).value);
  };
  const filteredData = posts.filter((post) => {
    if (post.body.toLowerCase().includes(searchValue.toLowerCase())) {
      return post.body.toLowerCase().includes(searchValue.toLowerCase());
    }
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  const sortedData = filteredData.sort((next, prev) => {
    // if (titleSort) {
    //   if (next.title.toLowerCase() < prev.title.toLowerCase()) {
    //     return -1;
    //   }
    //   return 1;
    // }
    // if (bodySort) {
    //   if (next.body.toLowerCase() < prev.body.toLowerCase()) {
    //     return -1;
    //   }
    //   return 1;
    // }
    if (descIdSort) {
      return prev.id - next.id;
    }
    return next.id - prev.id;
  });

  const setLocation = (currentLocation: any) => {
    try {
      //@ts-ignore
      window.history.pushState(null, null, currentLocation);
      return;
    } catch (e) {}
    window.location.hash = "#" + currentLocation;
  };

  const pagesCount = Math.ceil(filteredData.length / POSTS_PER_PAGE);
  const arrOfPageButtons = new Array(pagesCount).fill(0);
  const pagination = arrOfPageButtons.map((button, index) => {
    return (
      <button
        key={index}
        className="list-buttons"
        onClick={() => {
          //@ts-ignore
          setActivePage(index + 1);
          setStartPageIndex((index + 1) * 10 - 10);
          setFinalPageIndex((index + 1) * 10);
          setLocation("/page=" + (index + 1));
        }}
      >
        {index + 1}
      </button>
    );
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

  const [activePage, setActivePage] = useState();
  const [isSorted, setIsSorted] = useState(false);

  const options = {
    searchString: searchValue,
    page: activePage,
    sort: isSorted,
  };
  const applyFilters = (postsToFilter: any, filterOptions: any) => {
    const filteredPosts = [...postsToFilter]
      //@ts-ignore
      .sort((next, prev) => {
        if (filterOptions.sort) {
          return prev.id - next.id;
        }
      })
      .filter((post: any) => {
        return (
          post.body.includes(filterOptions.searchString) ||
          post.title.includes(filterOptions.searchString)
        );
      })
      .slice(
        filterOptions.page * POSTS_PER_PAGE - 10,
        filterOptions.page * POSTS_PER_PAGE
      );
    // console.log(filteredPosts);
    return filteredPosts;
  };
  console.log(applyFilters(posts, options));

  return (
    <div>
      <Search onChange={searchHandler} />
      {filteredData.length !== 0 ? (
        <table>
          <TableHead
            onIdClick={() => {
              setIsSorted((prevState) => !prevState);
            }}
            // onIdClick={handleIdSort}
            // onTitleClick={handleTextSort}
            // onBodyClick={handleBodySort}
          />
          <tbody>{postsData}</tbody>
        </table>
      ) : (
        <h1>NO DATA</h1>
      )}

      {filteredData.length > 10 ? (
        <Pagination
          // onNextClick={showNextInfo}
          // onPrevClick={showPrevInfo}
          content={pagination}
        />
      ) : null}
    </div>
  );
};
