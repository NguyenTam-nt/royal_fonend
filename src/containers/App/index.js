import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoyalConainer from "../RoyalContainer";
import SignUpContainer from "../SignUpContainer";
import Animation from "../Animation";
import BodyPage from "../BodyPage";
import BodyPagePry from "../BodyPage/BodyPagePry";
import SenMessageContainer from "../BodyPage/SenMessageContainer";
import ListMessageContainer from "../BodyPage/SenMessageContainer/ListMessageContainer";
import CreateRoomContainer from "../BodyPage/SenMessageContainer/CreateRoomContainer";
import DetailUserContainer from "../DetailUserContainer";
import DetailPost from "../DetailPost";
import PostsContainer from "../DetailUserContainer/PostsContainer";
import PhotosConainer from "../DetailUserContainer/PhotosConainer";
import AboutContainer from "../DetailUserContainer/AboutContainer";
import FriendsContainer from "../DetailUserContainer/FriendsContainer";

function App(props) {
  return (
    <BrowserRouter>
      <Animation />
      <Routes>
        <Route
          path="/sign-up/redirect"
          element={<SignUpContainer />}
          exact
        ></Route>
        <Route path="/" element={<RoyalConainer />}>
          <Route path="/" element={<BodyPage />}>
            <Route path="/" element={<BodyPagePry />} />
            <Route path="send-message" element={<SenMessageContainer />}>
              <Route path="room/:slug" element={<ListMessageContainer />} />
              <Route path="create" element={<CreateRoomContainer />} />
            </Route>
            <Route path="name/:_u/" element={<DetailUserContainer />}>
              <Route index element={<PostsContainer />} />
              <Route path="about" element={<AboutContainer />} />
              <Route path="friends" element={<FriendsContainer />} />
              <Route path="photos" element={<PhotosConainer />} />
            </Route>
            <Route path="post/:slug" element={<DetailPost />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
