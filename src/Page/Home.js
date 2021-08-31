//홈.. 페이지로 프로필이나 트윗등록이나 여러가지 할수잇는 환경이다
import { useState, useEffect } from "react";
import { dbService, storageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import Tweet from "./Tweet";

const Home = ({ userObj }) => {
  // console.log(userObj); //uid가 있다 (userid)
  const [tweet, setTweet] = useState(""); //트윗
  const [tweets, setTweets] = useState([]); //목록
  const [attachment, setAttachment] = useState(""); //사진 미리보기 구현

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

  const onSubmit = async (event) => {
    event.preventDefault();
    // await dbService
    //   .collection("tweets") //컬렉션을 생성한다//add는 파이어스토어에 저장할때 add
    //   .add({ text: tweet, createdAt: Date.now(), creatorId: userObj.uid }); //파이어베이스 데이터베이스에 저장//문서생성
    // setTweet(""); //트위한후 초기화
    const attachmentRef = storageService
      .ref()
      .child(`${userObj.uid}/${uuidv4()}`);
    //스토리지 호출   레퍼호출 차일드함수에 아이디를 폴더이름으로 파일이름을 uuidv4처리
    const response = await attachmentRef.putString(attachment, "data_url");
    const attachmentUrl = await response.ref.getDownloadURL(); // putString 함수
    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setTweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setTweet(value);
    //event.target.value
  };

  const onFileChange = (event) => {
    const {
      target: { files }, //구조분해할당
    } = event;
    const theFile = files[0];
    const reader = new FileReader(); //파일을 읽어주는 브라우저 api
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result); //url값을 얻기위해 구조분해할당
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment("");
  //readAsDataURL 은 파일을 인식하는시점과 끝남시점을 포함하궈있어서 시점까지 관리해줘야함
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="무슨 생각을 하고있나요?"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        {/*웹에올릴때는 타입은 파일로하면된다 */}
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
        {/*&& attachment가 있을경우 */}
      </form>
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
