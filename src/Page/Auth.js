//로그인 환경
import { authService, firebaseInstance } from "../firebase";
import LoginForm from "./LoginForm";

const Auth = () => {
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
  };

  return (
    <div>
      <LoginForm />
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
