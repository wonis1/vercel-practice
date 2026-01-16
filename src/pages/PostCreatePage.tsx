import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";

export default function PostCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  const errorMessage =
    mutation.isError && mutation.error
      ? typeof mutation.error === "string"
        ? mutation.error
        : JSON.stringify(mutation.error)
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button disabled={mutation.isPending}>Create</button>
      {mutation.isPending && <p>Creating...</p>}
      {mutation.isSuccess && <p>Created.</p>}
      {errorMessage && <p>Failed: {errorMessage}</p>}
    </form>
  );
}
