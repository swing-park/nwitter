import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  FirestoreError,
  getDocs,
  query,
} from "firebase/firestore";
import { Nweet } from "types";

const NweetForm = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState<Nweet[]>([]);

  const fetchNweets = async () => {
    const getNweetsQuery = query(collection(db, "nweets"));
    const getNweetsQuerySnapshot = await getDocs(getNweetsQuery);

    getNweetsQuerySnapshot.forEach((doc) => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObj, ...prev]);
    });
  };

  useEffect(() => {
    fetchNweets();
  }, []);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "nweets"), {
        nweet,
        createdAt: Date.now(),
      });
    } catch (err) {
      console.error((err as FirestoreError).code);
      console.error((err as FirestoreError).message);
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
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NweetForm;
