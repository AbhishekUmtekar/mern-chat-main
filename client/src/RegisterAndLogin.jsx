import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";

const RegisterAndLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage('');
    try {
      const url = isLoginOrRegister === "register" ? "/register" : "/login";
      const { data } = await axios.post(url, { username, password });
      setLoggedInUsername(username);
      setId(data.id);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response?.data?.error || 'An error occurred');
      console.log("Error", error);
    }
  };

  return (
    <div className="bg-blue-50 h-screen flex-col justify-center flex items-center">
      <div className="pb-5">
        {
          isError && errorMessage.length > 1 ? (
            <div style={{ color: "red", fontSize: "17px", fontWeight: "500" }}>
              <h4>{errorMessage}</h4>
            </div>
          ) : (
            <div></div>
          )
        }
      </div>
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>

        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div>
              Already have an account?{" "}
              <button onClick={() => setIsLoginOrRegister("login")}>
                Login Here
              </button>
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
              Dont have an account?{" "}
              <button onClick={() => setIsLoginOrRegister("register")}>
                Register
              </button>
            </div>
          )}
        </div>
      </form>

    </div>
  );
};

export default RegisterAndLogin;
