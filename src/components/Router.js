import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../Page/Auth";
import Home from "../Page/Home";

const AppRouter = ({ isLoggedin }) => {
  return (
    <Router>
      <Switch>
        {isLoggedin ? (
          <Route exact={true} path="/">
            <Home />
          </Route>
        ) : (
          <Route exact={true}>
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
