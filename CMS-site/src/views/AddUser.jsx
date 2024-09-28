import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e, username, email, password, phoneNumber, address) {
    e.preventDefault();
    try {
      const body = { username, email, password, phoneNumber, address };
      const { data } = await axios.post(`https://h8-phase2-gc.vercel.app/apis/add-user`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");
      Toastify({
        text: `Succedd add new user`,
        duration: 3000,
        newWindow: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
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
      {/* Dashboard Widgets */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Posts */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Add User</h2>
          <div className="overflow-x-auto">
            <form onSubmit={e => handleSubmit(e, username, email, password, phoneNumber, address)} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="username">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter username ..."
                  required=""
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 bg-white"
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email address ..."
                  required=""
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 bg-white"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password ..."
                  required=""
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 bg-white"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number (optional) ..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 bg-white"
                  onChange={e => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
              </div>
              {/* Address */}
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="address">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  placeholder="Enter address (optional) ..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 bg-white"
                  onChange={e => setAddress(e.target.value)}
                  value={address}
                />
              </div>
              {/* Submit Button */}
              <div>
                <button type="submit" className="float-right bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 ">
                  Add New User
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
