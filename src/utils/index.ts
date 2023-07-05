export const makeAuthError = (code: string): string => {
  switch (code) {
    case "auth/user-not-found":
      return "유저가 존재하지 않습니다. 이메일 혹은 비밀번호를 확인해주세요.";
    case "auth/wrong-password":
      return "잘못된 비밀번호 입니다.";
    case "auth/email-already-in-use":
      return "이미 사용 중인 이메일입니다.";
    case "auth/weak-password":
      return "비밀번호는 6글자 이상이어야 합니다.";
    case "auth/invalid-email":
      return "잘못된 이메일 형식입니다.";
    case "auth/invalid-email-verified	":
      return "인증코드가 정확하지 않습니다.";
    case "auth/internal-error":
      return "잘못된 요청입니다.";
    default:
      return "로그인에 실패 하였습니다.";
  }
};
