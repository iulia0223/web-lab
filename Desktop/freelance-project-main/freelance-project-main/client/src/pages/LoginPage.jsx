import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useProfileStore } from "../store/userStore";

import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const { user, isLoading } = useProfileStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="bg-gray-200 min-h-screen w-full grid place-content-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user && !isLoading) {
    return (
      <section className="bg-gray-200">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
            <LoginForm />
          </div>
        </div>
      </section>
    );
  }
};

export default LoginPage;
