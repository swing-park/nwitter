import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import Home from "./Home";
import Auth from "./Auth";
import { isLoggedInState } from "store/atoms";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
