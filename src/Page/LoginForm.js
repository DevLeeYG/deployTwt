import React, { useState } from "react";
import { authService } from "../firebase";

const LoginForm = () => {
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
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
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
    </>
  );
};

export default LoginForm;
