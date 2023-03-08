export const PostContent = ({ key, postId, postTitle, postBody }: any) => {
  return (
    <tr key={key}>
      <td>{postId}</td>
      <td>{postTitle}</td>
      <td>{postBody}</td>
    </tr>
  );
};
