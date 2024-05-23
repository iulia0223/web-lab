import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { authServices } from "../services/authService";
import { useProfileStore } from "../store/userStore";

const LoginForm = () => {
  const navigate = useNavigate();

  const { setUser } = useProfileStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [actionType, setActionType] = useState("login");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) toast.error("Please fill in all the fields!");

    try {
      const { data: loginData, status: loginStatus } = await authServices.login(
        {
          username,
          password,
        }
      );

      if (loginStatus !== 200) {
        toast("Invalid credentials!");
      } else {
        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 7);
        const expires = `expires=${expiresDate.toUTCString()}`;

        document.cookie = `accessToken=${loginData.accessToken}; path=/; ${expires}`;

        const { data: profileData, status } = await authServices.profile(
          loginData.accessToken
        );
        if (status === 200) {
          setUser(profileData);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Error logging in!");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !password) toast.error("Please fill in all the fields!");

    try {
      const { data, status: registerStatus } = await authServices.register({
        username,
        password,
      });

      if (data.includes("E11000 duplicate key error")) {
        toast.error("Username already exists!");
      }

      if (registerStatus !== 201) {
        toast();
      } else {
        toast.success("Account created successfully!");
        setActionType("login");
      }
    } catch (error) {
      toast.error("Error signing up!");
    }
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        {actionType === "login"
          ? "Login to your account"
          : "Sign up a new account"}
      </h1>
      <form className="space-y-2 md:space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            placeholder="username"
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            required
            autoComplete="current-password"
          />
        </div>
        <button
          onClick={actionType === "login" ? handleLogin : handleSignup}
          type="submit"
          className="w-full text-white bg-[#2563eb] hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {actionType === "login" ? "Login" : "Sign up"}
        </button>
      </form>
      <div>
        <p>
          {actionType === "login"
            ? "Do'nt have an account?"
            : "Have an account"}{" "}
          <strong
            className="hover:underline cursor-pointer"
            onClick={() =>
              setActionType((prevState) =>
                prevState === "login" ? "register" : "login"
              )
            }
          >
            {actionType === "login" ? "Sign up" : "Sign in"}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
