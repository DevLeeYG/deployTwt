import { useHistory } from "react-router-dom";
import { authService } from "../firebase";

const Profile = () => {
  const history = useHistory();

  const onLogOutClick = () => {
    //로그아웃클릭을했을때 그냥 홈으로 바꿔줌
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
//signOut 함수는 로그인 간단하게 해준다
export default Profile;
//안될때는 그냥 노드 모듈다시깔고 ^^
