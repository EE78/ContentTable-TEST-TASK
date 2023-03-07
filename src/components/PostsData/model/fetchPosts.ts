const baseUrl = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = () => fetch(baseUrl).then((res) => res.json());
