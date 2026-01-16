import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import { Link } from "react-router-dom";

export default function PostListPage() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load posts.</div>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
            </Link>
            <h2>{post.title}</h2>
            <p>{new Date(post.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}