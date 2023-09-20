import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Header } from "./components";
import Road from "./config/Road";
import axios from "axios";
import LoginPage from "./pages/cog/LoginPage";
import Dasboard from "./pages/cog/Dasboard";
axios.defaults.baseURL = "http://localhost:8081";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="owner/:setpage"
          element={
            <>
              <Dasboard/>
            </>
          }
        />
        <Route
          path="owner/login"
          element={
            <>
              <LoginPage/>
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Header />
              <Road />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
