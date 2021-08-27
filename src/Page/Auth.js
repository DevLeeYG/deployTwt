//로그인 폼만들꺼
import React from "react";

const Auth = () => {
  return (
    <div>
      <from>
        <input type="email" placeholder="E-Mail" required />
        <input type="password" required />
        <input type="submit" value="Log In" />
      </from>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
//required 반드시 채워서 보내야되는 설정
