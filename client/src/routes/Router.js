import React from "react";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";

import PostCardList from "./nomalRoute/PostCardList";
import PostWrite from "./nomalRoute/PostWrite";
import PostDetail from "./nomalRoute/PostDetail";
import PostEdit from "./nomalRoute/PostEdit";
import Search from "./nomalRoute/Search";
import Profile from "./nomalRoute/Profile";
import CategoryResult from "./nomalRoute/CategoryResult";
import {
  EditProtectedRoute,
  ProfileProtectedRoute,
} from "./protectedRoute/ProtectedRoute";

const MyRouter = () => (
  <>
    <AppNavbar />
    <Header />
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/post" exact component={PostWrite} />
        <Route path="/post/:id" exact component={PostDetail} />
        <Route
          path="/post/:category/:categoryName"
          exact
          component={CategoryResult}
        />
        <Route path="/search/:searchTerm" exact component={Search} />
        <EditProtectedRoute path="/post/:id/edit" exact component={PostEdit} />
        <ProfileProtectedRoute
          path="/user/:userName/profile"
          exact
          component={Profile}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </>
);

export default MyRouter;
