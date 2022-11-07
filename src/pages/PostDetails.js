import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";

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
function PostDetails() {
  const { id } = useParams();
  const [postD, setPostD] = useState(initialObject);

  const { fetchData, setLoading, loading } = useContext(AppContext);
  useEffect(() => {
    fetchData(
      `https://dummyapi.io/data/v1/post/${id}`,
      setPostD,
      setLoading,
      false
    );
  }, [id]);

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div className="card" style={{ width: "30rem", margin: "20px auto" }}>
            <img
              className="card-img-top"
              src={postD.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <p className="text-secondary">Name of the Owner:</p>
              <h5 className="card-title">
                {postD.owner.firstName + " " + postD.owner.lastName}
              </h5>
              <h5 className="text-secondary">
                No. of likes:{" "}
                <strong className="text-black">{postD.likes}</strong>
              </h5>
              <h5 className="text-secondary">
                Tags:{" "}
                <p>
                  <strong className="text-black">{postD.tags}</strong>
                </p>
              </h5>
              <p className="card-text">{postD.text}</p>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default PostDetails;
