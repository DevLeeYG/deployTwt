import { dbService, storageService } from "../firebase";
import { useState } from "react";
/* creatorid 로 uid추가한이유는 삭제와 수정기능에 필요하기때문이다
트윗을쓴사람만 삭제나 수정이 가능하게 하려면 creatorId와 현재 로그인사람의 uid를 비교해서 같으면 삭제 수정을 보여주면된다
*/

const Tweet = ({ tweetObj, isOwner }) => {
  const [edit, setEdit] = useState(false); //토글상태를 관리 버튼을 눌렀을대 입력란과 버튼이 나타나는 기준점
  const [newTweet, setNewTweet] = useState(tweetObj.text); //초깃값관리

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      if (tweetObj.attachmentUrl !== "")
        await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };

  const toggleEdit = () => setEdit((prev) => !prev);
  //유즈스테이츠에 함수로 인자를 전달하면  인자로 전달한 함수의 첫번째 인자에(prev)에 이전의 상태가 넘어온다

  const onChange = (event) => {
    setNewTweet(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({ text: newTweet });
    setEdit(false);
  };

  return (
    <div>
      {edit ? ( //false라면 이게 보이고 트루라면 밑에게 보인다
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newTweet} required />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEdit}>Cencle</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>{" "}
          {tweetObj.attachmentUrl && (
            <img
              src={tweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt=""
            />
          )}
          {/*isOwner는 로그인한 아이디가 현재아이디와같다면 보여주는것이다 */}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEdit}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
