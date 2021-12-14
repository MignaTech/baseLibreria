import { Redirect, Route } from "react-router-dom";

let auth;
auth = null;
auth = true;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest}>{auth ? <Component /> : <Redirect to="/" />}</Route>;
};

export default PrivateRoute;
