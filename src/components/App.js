import { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase";
//내가 서버를만든상태라면 전부내가 회원가입로그인기능을 구축해야되지만 파이어베이스를이용한다면 모든기능을 가단하게
// 소셜 로그인까지 적용할수있다.

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //트윗과 파이어베이스 로그인연동기능
  console.log(authService);
  return (
    <>
      <AppRouter isLoggedin={isLoggedIn} />
      <footer>Copyright@{new Date().getFullYear()}</footer>
    </>
  );
}

export default App;

/*
 보통 웹 만들때 푸터로 카피라이트 간단하게 삽입해보자
 앱에서 상태관리를 관리해주고있다
 jsconfig.json -> npm install dotenv -> vs껏다키기

 페이지를 이루는 폴더는 나는 페이지에 저장할거고
 페이지의 구성요소들은 컴포넌트에 저장할것이다
*/
