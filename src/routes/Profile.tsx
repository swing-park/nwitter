import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();

  const handleClickLogOut = () => {
    const auth = getAuth();
    auth.signOut().then(() => navigate("/login"));
  };

  return (
    <div>
      <button onClick={handleClickLogOut}>로그아웃</button>
    </div>
  );
};

export default Profile;
