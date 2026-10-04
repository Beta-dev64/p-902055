import { Navigate, useParams } from "react-router-dom";

// Fallback for share links whose preview page isn't generated yet: go to the article.
const ShareRedirect = () => {
  const { file = "" } = useParams();
  return <Navigate to={`/blog/${file.replace(/\.html$/, "")}`} replace />;
};
export default ShareRedirect;
