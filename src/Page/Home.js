//홈.. 페이지로 프로필이나 트윗등록이나 여러가지 할수잇는 환경이다
import { useState, useEffect } from "react";
import { dbService } from "../firebase";

const Home = () => {
  const [tweet, setTweet] = useState(""); //트윗
  const [tweets, setTweets] = useState([]); //목록

  const getTweets = async () => {
    const dbTweet = await dbService.collection("tweets").get(); //데이터베이스 트윗 겟요청
    dbTweet.forEach((doc) => setTweets((prev) => [doc.data(), prev]));
  }; //어싱크 어웨이트는 따로뺴서 함수로 만들어주고 유즈이펙트에서써야함

  useEffect(() => {
    getTweets();
  }, []);
  console.log(tweets);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection("tweets") //컬렉션을 생성한다
      .add({ text: tweet, createdAt: Date.now() }); //파이어베이스 데이터베이스에 저장//문서생성
    setTweet(""); //트위한후 초기화
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="무슨 생각을 하고있나요?"
        maxLength={120}
        value={tweet}
        onChange={onChange}
      />
      <input type="submit" value="Tweet" />
    </form>
  );
};
//제출 서브밋에 벨류를 설정해주면 트윗으로 문자가 변하고 타입을 서브밋으로하면 클릭버튼으로 바뀐다
export default Home;
