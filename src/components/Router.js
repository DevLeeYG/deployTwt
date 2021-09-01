import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../Page/Auth";
import Home from "../Page/Home";
import Navigation from "./Navigation";
import Profile from "../Page/Profile";

const AppRouter = ({ isLoggedin, userObj }) => {
  return (
    //로그인 되상태에서만 네비게이션 로그인이 되면 홈 컴포넌트 로그아웃이면 Auth
    <Router>
      {isLoggedin && <Navigation />}
      <Switch>
        {isLoggedin ? (
          <>
            <Route exact={true} path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact={true} path="/profile">
              <Profile userObj={userObj} />
            </Route>
          </>
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
