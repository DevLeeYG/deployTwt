//로그인 폼만들꺼
import { useState } from "react";

const Auth = () => {
  const [eMail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.name);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(e.target.name);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form>
      <div onSubmit={onSubmit}>
        <input
          name="email"
          value={eMail}
          onChange={handleEmailChange}
          type="email"
          placeholder="E-Mail"
          required
        />

        <input
          name="password"
          value={password}
          placeholder="password"
          onChange={handlePasswordChange}
          type="password"
          required
        />
        <input type="submit" value="Log In" />
      </div>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </form>
  );
};

export default Auth;
//required 반드시 채워서 보내야되는 설정
//로그인구현할때는 form 태그 추천
