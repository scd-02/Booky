import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function RegisterPage() {
  const [name, setName] = useState("john");
  const [email, setEmail] = useState("john@gmail.com");
  const [password, setPassword] = useState("john");

  const toastProperty = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
    transition: Slide,
  };

  const registerUser = async (ev) => {
    ev.preventDefault();

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      await axios.post(
        "/api/user/register",
        {
          name,
          email,
          password,
        },
        config
      );

      toast.success("registration successfull", toastProperty);
    } catch (error) {
      toast.warn("registration unsuccessfull", toastProperty);
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
