import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  console.log(userObj);
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">{userObj.displayName}의 Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;

//링크로 홈키누르면 홈 마이프로필은 프로필 화면으로 가는거다
