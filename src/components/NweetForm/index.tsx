import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Nweet } from "types";
import { useRecoilState } from "recoil";
import { userState } from "store/atoms";

const NweetForm = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState<Nweet[]>([]);
  const user = useRecoilState(userState);

  const fetchNweets = () => {
    const getNweetsQuery = query(
      collection(db, "nweets"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(getNweetsQuery, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  };

  useEffect(() => {
    fetchNweets();
  }, []);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        uid: user[0]?.uid,
      });
    } catch (err) {
      console.error(err as FirestoreError);
    }

    setNweet("");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNweet(e.target.value);

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={handleOnChange}
          placeholder="What's on your mind?"
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NweetForm;
