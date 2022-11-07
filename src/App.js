import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostsList from "./pages/PostsList";
import { AppContext } from "./context/AppContext";
import CreatePost from "./pages/CreatePost";

import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";

function App() {
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(1);

  const fetchData = (url, state, setLoad, all = true) => {
    setLoad(true);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "app-id": "636513a1a404ce5868d2f4da",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (all) {
          state(data.data);
        } else {
          state(data);
        }
        setLoad(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function handleSubmit(e, type, typeOfPost) {
    e.preventDefault();
    const requestOptions = {
      method: type,
      headers: {
        "Content-Type": "application/json",
        "app-id": "636513a1a404ce5868d2f4da",
      },
      body: JSON.stringify(typeOfPost),
    };
    let url =
      type === "PUT"
        ? `https://dummyapi.io/data/v1/post/${typeOfPost.id}`
        : `https://dummyapi.io/data/v1/post/create`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("after db", data);

        setRefetch((prevState) => prevState + 1);
      });
  }

  useEffect(() => {
    fetchData(
      "https://dummyapi.io/data/v1/post?limit=3",
      setAllTickets,
      setLoading,
      true
    );
  }, [refetch]);

  return (
    <AppContext.Provider
      value={{ fetchData, setLoading, loading, setRefetch, handleSubmit }}
    >
      <BrowserRouter>
        <Link
          to={"/create/"}
          className="button btn btn-lg btn-block btn-success"
        >
          CREATE NEW POST
        </Link>
        <Routes>
          <Route path="/" exact element={<PostsList posts={allTickets} />} />
          <Route path="/:id" exact element={<PostDetails />} />
          <Route path="/create/" exact element={<CreatePost />} />
          <Route path="/:id/edit" exact element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
