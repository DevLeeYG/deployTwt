/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../firebase";
import { useEffect } from "react";

const Profile = ({ userObj }) => {
  const history = useHistory();

  const getMyTweet = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("creatorAt")
      .get();
    tweets.docs.map((doc) => doc.data());
  };
  useEffect(() => {
    getMyTweet();
  }, []);
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
