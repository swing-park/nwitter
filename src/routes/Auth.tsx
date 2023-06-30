import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { KakaoLogin } from "components";
import { userState } from "store/atoms";

const Auth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleOnChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [name]: value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
    } catch (err) {
      alert((err as AuthError).message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      }
    });
  }, [setUser, navigate]);

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          required
          onChange={handleOnChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={handleOnChange}
        />
        <input type="submit" value="LOGIN" />
      </form>
      <button>Continue with Google</button>
      <button>Continue with Github</button>
      <KakaoLogin />
    </div>
  );
};

export default Auth;
