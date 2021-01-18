import { Router, Route, Switch, Redirect } from "react-router-dom";
import EditUser from "../pages/EditUser/EditUser";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import history from "../utils/history";
import { useSelector } from "react-redux";

const ConnectedRoute = () => {
  return (
    <>
      <Route path="/home" component={Home} />
      <Route path="/edit/:id" component={EditUser} />
    </>
  );
};

const MyRouter = (props) => {
  const { token } = useSelector((state) => state.users).userInfos;
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        {token && <ConnectedRoute />}
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default MyRouter;
