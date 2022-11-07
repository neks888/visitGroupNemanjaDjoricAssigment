import React from "react";
import "./PostList.css";
import SinglePost from "../components/SinglePost";

export default function PostsList({ posts }) {
  return (
    <div className="allPosts">
      {posts.map((post) => (
        <SinglePost key={Math.random()} post={post} />
      ))}
    </div>
  );
}
