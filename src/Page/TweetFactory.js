import { useState } from "react";
import { dbService, storageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";
const TweetFactory = ({ userObj }) => {
  // console.log(userObj); //uid가 있다 (userid)
  const [tweet, setTweet] = useState(""); //트윗

  const [attachment, setAttachment] = useState(""); //사진 미리보기 구현

  const onSubmit = async (event) => {
    event.preventDefault();
    // await dbService
    //   .collection("tweets") //컬렉션을 생성한다//add는 파이어스토어에 저장할때 add
    //   .add({ text: tweet, createdAt: Date.now(), creatorId: userObj.uid }); //파이어베이스 데이터베이스에 저장//문서생성
    // setTweet(""); //트위한후 초기화
    let attachmentUrl = "";
    if (attachment !== "") {
      //atta가 있을때만 스토리지에 등록할수있어 파일을
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      //스토리지 호출   레퍼호출 차일드함수에 아이디를 폴더이름으로 파일이름을 uuidv4처리
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL(); // putString 함수
    }
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
  );
};

export default TweetFactory;
