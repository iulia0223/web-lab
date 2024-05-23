import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";

import { authServices } from "./services/authService";
import { useProfileStore } from "./store/userStore";

import { getAccessToken } from "./utils";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { setUser, setIsLoading, setToken } = useProfileStore();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      const accessToken = getAccessToken();
      if (accessToken) {
        await setToken(accessToken);
        try {
          const { data, status } = await authServices.profile(accessToken);
          if (status === 200) {
            await setUser(data);
          }
        } catch (error) {
          document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [setUser, setIsLoading, setToken]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
        theme="dark"
      />
    </>
  );
}

export default App;
