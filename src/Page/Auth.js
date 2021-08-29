//로그인 환경
import { authService, firebaseInstance } from "../firebase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true); // Account를 가지고 있는지 확인해서, newAccount 가 필요한 경우 true
  const [error, setError] = useState(""); // 에러관리 // 무슨에러를 담아야할까?
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    // createUserWithEmailAndPassword는 promise를 return 하기 때문에 async로 비동기화 시킴
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // newAccount의 상태에 따라서 받은 input을 submit의 method로 계정 생성에 쓸건지, 로그인에 쓸건지 조건을 주고 있다.
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError("The email address is already in use by another account"); //에러안의 메세지가
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev); //전키를 기억해서
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        {/*에러메시지 에러가 있다 면 에러가 seterror로 변함 */}
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;

//로그인할때는 폼태그 폼에 온 서브밋으로 제출할수있게 만들어야함 서버로

/* 뉴어카운트가 트루일때는 가입할때의 상태인데 만약 상태가 있다면 펄스느 로그인할때의 상태이다 
   setPersistence = loca,session, none, 옵션 로그인을 한상태를 유지는 어떠헥?

   local : 웹 브라우조를 종료해도 유지
   session : 웹 브라우조의 탭을 종료하면 로그아웃
   none : 새로고침하면 로그아웃
   
*/

// 이벤트 타겟 네임으로 로그인구별..(event.target.name)
// 소셜 로그인에는 provider가 필요하다
