import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import KakaoRedirect from "./KakaoRedirect";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/callback/kakaotalk" element={<KakaoRedirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
