import React from "react";
import { Link } from "react-router-dom";
import "./SinglePost.css";

function SinglePost({ post }) {
  return (
    <React.Fragment>
      <div className="card" style={{ width: "18rem", margin: "10px" }}>
        <img className="card-img-top" src={post.image} alt="Card image cap" />
        <div className="card-body">
          <p className="card-text">{post.text}</p>
        </div>

        <div className="buttons">
          <Link to={`/${post.id}/`} className="btn btn-primary">
            Details
          </Link>

          <Link to={`/${post.id}/edit`} className="btn btn-success">
            Edit
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SinglePost;
