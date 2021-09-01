import { useHistory } from "react-router-dom";
import { authService, dbService } from "../firebase";
import { useState, useEffect } from "react";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  //뉴디스플레이는 새별명을 지어주는거
  const onLogOutClick = () => {
    //로그아웃클릭을했을때 그냥 홈으로 바꿔줌
    authService.signOut();
    history.push("/");
  };

  const handleChange = (e) => {
    setNewDisplayName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={newDisplayName}
          type="text"
          placeholder="Display name"
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
//signOut 함수는 로그인 간단하게 해준다
export default Profile;
//안될때는 그냥 노드 모듈다시깔고 ^^
