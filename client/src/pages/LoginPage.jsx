import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { UserState } from "../context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test");

  const { setUser } = UserState();

  const [redirect, setRedirect] = useState(false);

  const toastProperty = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
    transition: Slide,
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      setUser(data);
      toast.success("login successfull", toastProperty);
      setRedirect(true);
    } catch (error) {
      toast.warn("login unsuccessfull", toastProperty);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
