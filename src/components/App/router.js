import React from "react";
import Story from "../Story/Story";
import Editor from "../Story/Editor";
import Home from "../Home";
import Login from "../Auth/Login";
import Profile from "../Profile/Profile";
import ProfileFavorites from "../Profile/ProfileFavorites";
import Register from "../Auth/Register";
import Settings from "../Profile/Settings";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/register": () => <Register />,
  "/editor/:slug": ({ slug }) => <Editor slug={slug} />,
  "/editor": () => <Editor />,
  "/story/:id": ({ id }) => <Story id={id} />,
  "/settings": () => <Settings />,
  "/@:username/favorites": ({ username }) => (
    <ProfileFavorites username={username} />
  ),
  "/@:username": ({ username }) => <Profile username={username} />,
};

export default routes;
