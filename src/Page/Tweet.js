import { dbService } from "../firebase";
/* creatorid 로 uid추가한이유는 삭제와 수정기능에 필요하기때문이다
트윗을쓴사람만 삭제나 수정이 가능하게 하려면 creatorId와 현재 로그인사람의 uid를 비교해서 같으면 삭제 수정을 보여주면된다
*/

const Tweet = ({ tweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      const data = await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  };

  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button>Edit Tweet</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
