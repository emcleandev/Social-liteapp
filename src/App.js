import { Routes, Route } from "react-router-dom";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/Home/activate";
import Reset from "./pages/Reset";
import CreatePostPopup from "./components/CreatePostPopup";
import { useSelector } from "react-redux";
import { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { postsReducer } from "./functions/reducers";
import Friends from "./pages/friends";

function App() {
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const { user, darkTheme } = useSelector((state) => ({ ...state }));

  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    error: "",
    posts: [],
  });

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className={darkTheme && "dark"}>
      {createPostVisible && (
        <CreatePostPopup
          user={user}
          setCreatePostVisible={setCreatePostVisible}
          post={posts}
          dispatch={dispatch}
        />
      )}

      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={
              <Profile
                setCreatePostVisible={setCreatePostVisible}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route
            path="/profile/:username"
            element={
              <Profile
                setCreatePostVisible={setCreatePostVisible}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />

          <Route
            path="/friends"
            element={
              <Friends
                setCreatePostVisible={setCreatePostVisible}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route
            path="/friends/:type"
            element={
              <Friends
                setCreatePostVisible={setCreatePostVisible}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route
            path="/"
            element={
              <Home
                setCreatePostVisible={setCreatePostVisible}
                posts={posts}
                loading={loading}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
