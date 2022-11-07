import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AppContext } from "../context/AppContext";
import "./EditPost.css";

let initialObject = {
  id: undefined,
  image: undefined,
  likes: undefined,
  link: undefined,
  owner: {
    id: undefined,
    title: undefined,
    firstName: undefined,
    lastName: undefined,
    picture: undefined,
  },
  publishDate: undefined,
  tags: undefined,
  text: undefined,
};

export default function EditPost() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [editPost, setEditPost] = useState(initialObject);
  const { fetchData, handleSubmit } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(
      `https://dummyapi.io/data/v1/post/${id}`,
      setEditPost,
      setLoading,
      false
    );
  }, [id]);

  function handleChange(e) {
    setEditPost({
      ...editPost,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="center">
          <form
            onSubmit={(e) => {
              handleSubmit(e, "PUT", editPost);
              navigate("/");
            }}
            style={{ width: "18rem" }}
            className="form-inline py-3"
          >
            <label htmlFor="exampleFormControlTextarea1">
              URL of the new image
            </label>
            <input
              placeholder="Enter the URL of the image here"
              id="exampleFormControlTextarea1"
              style={{ marginBottom: "10px" }}
              type="url"
              value={editPost.image}
              name="image"
              className="form-control"
              onChange={(e) => handleChange(e)}
            />

            <label htmlFor="exampleFormControlTextarea1">No of likes</label>
            <input
              id="exampleFormControlTextarea2"
              style={{ marginBottom: "10px" }}
              type="number"
              value={editPost.likes}
              name="lastName"
              className="form-control"
              onChange={(e) =>
                setEditPost({ ...editPost, likes: e.target.value })
              }
            />
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Text</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={editPost.text}
                onChange={(e) =>
                  setEditPost({ ...editPost, text: e.target.value })
                }
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
}
