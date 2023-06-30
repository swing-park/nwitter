import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../firebase";

interface Auth {
  firebaseToken: string;
}

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) navigate("/login");

    (async () => {
      try {
        const res: AxiosResponse<Auth> = await axios.post("/api/auth/kakao", {
          code,
        });
        const { firebaseToken } = res.data;
        await signInWithCustomToken(auth, firebaseToken);
      } catch (error) {
        console.log(`에러발생 ! : ${error}`);
      }
    })();
  }, [navigate, code]);

  return <div>KakaoRedirect</div>;
};

export default KakaoRedirect;
