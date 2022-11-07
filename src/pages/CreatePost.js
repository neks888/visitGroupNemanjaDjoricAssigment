import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AppContext } from "../context/AppContext";

const initialPost = {
  text: "",
  image: "",
  likes: 0,
  tags: "",
  owner: "60d0fe4f5311236168a10a0b",
};
function CreatePost() {
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState(initialPost);
  const { handleSubmit } = useContext(AppContext);

  function handleChange(e) {
    setNewPost({
      ...newPost,

      [e.target.name]: e.target.value,
    });
  }
  const { text, image, likes, tags } = newPost;
  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          if (!text || !image || !likes || !tags) {
            alert("All fields must be filled");
            return;
          }
          handleSubmit(e, "POST", newPost);
          alert("Form Submitted");
          navigate("/");
        }}
        style={{ width: "18rem", margin: "0 auto", textAlign: "center" }}
        className="form-inline py-3  create"
      >
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Choose an Image</label>
          <input
            name="image"
            type="url"
            onChange={(e) => handleChange(e)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Likes</label>
          <input
            type="number"
            name="likes"
            value={newPost.likes}
            className="form-control"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Tags</label>
          <input
            name="tags"
            type="text"
            className="form-control"
            onChange={(e) => handleChange(e)}
            value={newPost.tags}
          />
        </div>

        <label htmlFor="exampleFormControlFile1">Text</label>
        <textarea
          name="text"
          className="form-control"
          onChange={(e) => handleChange(e)}
          value={newPost.text}
        ></textarea>

        <button type="submit" className="btn btn-info">
          Create New Post
        </button>
      </form>
    </React.Fragment>
  );
}
export default CreatePost;
