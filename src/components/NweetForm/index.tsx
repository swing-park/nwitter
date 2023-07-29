import { useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, FirestoreError } from "firebase/firestore";

const NweetForm = () => {
  const [nweet, setNweet] = useState("");

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
    </div>
  );
};

export default NweetForm;
