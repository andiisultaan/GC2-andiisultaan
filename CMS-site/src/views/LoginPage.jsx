import Toastify from "toastify-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post(`https://h8-phase2-gc.vercel.app/apis/login`, { email, password });
      localStorage.setItem("access_token", data.data.access_token);
      navigate("/");
      Toastify({
        text: "Success Login",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          fontWeight: "bold",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }
  return (
    <>
      <div
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/white-elegant-texture-background-style_23-2148432200.jpg?w=740&t=st=1727157182~exp=1727157782~hmac=d0c5f0377ce3b4e30a74c225bcbbf68299813cb287e0c4b62d990e88db35fa52')",
        }}
      >
        <div id="login" className="flex justify-center items-center h-full">
          <div className="bg-white shadow-lg p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Log In</h2>
            {/* Email input */}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              {/* Password input */}
              <div className="mb-4 relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="curent-password"
                />
              </div>
              {/* Login button */}
              <a href="index.html">
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">Login</button>
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
