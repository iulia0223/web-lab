import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import UserList from "../components/UserList";

import { useProfileStore } from "../store/userStore";
import { useSocket } from "../hooks/useSocket";
import ChatPopup from "../components/ChatPopup";

const UsersPage = () => {
  useSocket();
  const { user, isLoading, setUser } = useProfileStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div className="bg-gray-200 min-h-screen w-full grid place-content-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (user && !isLoading) {
    return (
      <section className="py-5 bg-gray-200 overflow-x-hidden relative">
        <div className="container max-w-screen-xl p-4 md:p-2 mx-auto min-h-screen flex flex-col gap-5">
          <div className="flex justify-between">
            <h1 className="text-center text-3xl sm:text-4xl font-bold">
              Users Page
            </h1>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                document.cookie =
                  "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                setUser(null);
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
          <UserList />
        </div>
        <ChatPopup />
      </section>
    );
  }
};

export default UsersPage;
