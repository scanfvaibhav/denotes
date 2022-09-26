import React, { Fragment ,useState} from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Home from "../Layout/Home/Home";
import NavBar from "../Layout/NavBar/NavBar";
import Add from "../Layout/Add/Add";
import Edit from "../Layout/Edit/Edit";
import Chat from "../Layout/Chat/Chat";
import Posts from "../Layout/Posts/Posts";
import Write from "../Layout/Write/Write";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Dform from "../components/Dform/Dform";
import FoodManager from "../components/FoodManager";
//import Upload from "../components/FileUpload/FileUpload";


const Routes = () => {
  const [login, setLogin] = useState(localStorage.getItem("userInfo")?true:false);
  return (
    <Fragment>
        <NavBar />
        {login?
        <Switch>
          <Route path="/" component={Posts } exact />
          <Route path="/Add" component={ Add } exact />
          <Route path="/Edit" component={ Edit } exact />
          <Route path="/Chat" component={ Chat } exact />
          <Route path="/Posts" component={ Posts } exact />
          <Route path="/Write" component={ Write } exact />
          <Route path="/Upload" component={ Write } exact />
          <Route path="/Form/" component={ Dform } exact />
          <Route path="/FoodManager/" component={ FoodManager } exact />


        </Switch>:<Register login={(value)=>setLogin(value)}/>}
      </Fragment>
  );
};

export default Routes;
