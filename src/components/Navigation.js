import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link> 
          </li>
          <li>
            <Link to="/profile">My profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;

//링크로 홈키누르면 홈 마이프로필은 프로필 화면으로 가는거다