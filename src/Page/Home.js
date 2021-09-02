//홈.. 페이지로 프로필이나 트윗등록이나 여러가지 할수잇는 환경이다
import { useState, useEffect } from "react";
import { dbService } from "../firebase";

import Tweet from "./Tweet";
import TweetFactory from "./TweetFactory";
const Home = ({ userObj }) => {
  // console.log(userObj); //uid가 있다 (userid)

  const [tweets, setTweets] = useState([]); //목록

  // const getTweets = async () => {
  //   const dbTweet = await dbService.collection("tweets").get(); //데이터베이스 트윗 겟요청
  //   //겟함수는 처음에 화면을 렌더링할?때만 쓴다
  //   dbTweet.forEach((doc) => {
  //     const tweetObject = { ...doc.data(), id: doc.id };
  //     setTweets((prev) => [tweetObject, ...prev]);
  //   });
  // }; //어싱크 어웨이트는 따로뺴서 함수로 만들어주고 유즈이펙트에서써야함

  useEffect(() => {
    // getTweets();
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(newArray); //tweets->셋 트위츠
    });
  }, []);

  return (
    <>
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((tweet) => {
          return (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === userObj.uid}
            ></Tweet>
          );
        })}
      </div>
    </>
  );
};
//제출 서브밋에 벨류를 설정해주면 트윗으로 문자가 변하고 타입을 서브밋으로하면 클릭버튼으로 바뀐다
export default Home;
//현재로썬 누가 쓴글인지? 모르겟네..
