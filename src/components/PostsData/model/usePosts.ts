import { useState, useEffect } from "react";
import { fetchPosts } from "./fetchPosts";
import IPost from "../interfaces/IPost";

export const usePosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    fetchPosts().then((result) => setPosts(result));
  }, []);
  return {
    posts,
  };
};
