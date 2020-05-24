import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Home from "../Layout/Home/Home";
import NavBar from "../Layout/NavBar/NavBar";
import Add from "../Layout/Add/Add";
import Edit from "../Layout/Edit/Edit";
import Chat from "../Layout/Chat/Chat";

const Routes = () => {
  return (
    <Fragment>
        <NavBar />
        <Switch>
          <Route path="/" component={ Home } exact />
          <Route path="/Add" component={ Add } exact />
          <Route path="/Edit" component={ Edit } exact />
          <Route path="/Chat" component={ Chat } exact />

        </Switch>
      </Fragment>
  );
};

export default Routes;
