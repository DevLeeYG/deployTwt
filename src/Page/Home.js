//홈.. 페이지로 프로필이나 트윗등록이나 여러가지 할수잇는 환경이다
import { useState } from "react";
import { dbService } from "../firebase";

const Home = () => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection("twees")
      .add({ text: tweet, createdAt: Date.now() });
    setTweet("");
  };

  const onChange = (event) => {
    setTweet(event.target.value);
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
