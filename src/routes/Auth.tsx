import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  AuthError,
  onAuthStateChanged,
  AuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { userState } from "store/atoms";
import { AuthForm } from "types";
import { makeAuthError } from "utils";

const Auth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [form, setForm] = useState<AuthForm>({ email: "", password: "" });
  const [newAccount, setNewAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (err) {
      console.error((err as AuthError).code);
      setError(makeAuthError((err as AuthError).code));
    }
  };

  const handleOnChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [name]: value });

  const handleClickSocial = async ({
    currentTarget: { name },
  }: React.MouseEvent<HTMLButtonElement>) => {
    let provider;
    try {
      if (name === "google") {
        provider = new GoogleAuthProvider();
      } else if (name === "github") {
        provider = new GithubAuthProvider();
      }
      await signInWithPopup(auth, provider as AuthProvider);
    } catch (err) {
      console.error((err as AuthError).code);
      setError(makeAuthError((err as AuthError).code));
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(JSON.parse(JSON.stringify(userData)));
      } else {
        setUser(null);
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
        <input type="submit" value={newAccount ? "가입하기" : "로그인"} />
        {error}
        <button onClick={() => setNewAccount(!newAccount)}>
          {newAccount ? "로그인" : "가입하기"}
        </button>
      </form>
      <button name="google" onClick={handleClickSocial}>
        Continue with Google
      </button>
      <button name="github" onClick={handleClickSocial}>
        Continue with Github
      </button>
    </div>
  );
};

export default Auth;
