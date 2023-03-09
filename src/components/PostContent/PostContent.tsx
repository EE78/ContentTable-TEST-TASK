export const PostContent = ({ postId, postTitle, postBody }: any) => {
  return (
    <tr>
      <td>{postId}</td>
      <td>{postTitle}</td>
      <td>{postBody}</td>
    </tr>
  );
};
