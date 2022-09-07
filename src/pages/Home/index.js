import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import CreatePost from "../../components/CreatePost";
import Header from "../../components/Header";
import LeftHome from "../../components/Home/Left";
import RightHome from "../../components/Home/Right";
import SendVerification from "../../components/Home/SendVerification";
import Stories from "../../components/Home/Stories";
import Post from "../../components/Post";

import "./styles.css";

function Home({ setCreatePostVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));

  const middle = useRef();

  const [height, setHeight] = useState();

  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setCreatePostVisible={setCreatePostVisible} />
        {loading ? (
          <div className="sekelton_loader">
            <ClipLoader color="#1876f2" />
          </div>
        ) : (
          <div className="posts">
            {posts.map((post, i) => (
              <Post key={i} post={post} user={user} />
            ))}
          </div>
        )}
      </div>
      <RightHome />
    </div>
  );
}

export default Home;
