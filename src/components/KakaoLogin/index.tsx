import { useEffect } from "react";

const KakaoLogin = () => {
  const handleClickKakaoLogin = () => {
    const redirectUri = `${process.env.REACT_APP_BASE_URL}/callback/kakaotalk`;
    const scope = "profile_nickname";

    window.Kakao.Auth.authorize({
      redirectUri,
      scope,
    });
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return (
    <div>
      <button onClick={handleClickKakaoLogin}>카카오로그인</button>
    </div>
  );
};

export default KakaoLogin;
