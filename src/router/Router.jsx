import { Router, Route, Switch,Redirect } from "react-router-dom";
import EditUser from "../pages/EditUser/EditUser";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import history from '../utils/history';

const MyRouter = props => {

    return <Router history={history}>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/home" component={Home}/>
            <Route path="/edit/:id" component={EditUser}/>
            <Redirect to="/login"/>
        </Switch>
    </Router>

}

export default MyRouter;