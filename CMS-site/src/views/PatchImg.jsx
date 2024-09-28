import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import Loading from "../assets/Ellipsis@1x-4.0s-200px-200px.svg";

export default function PatchImg() {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.patch(`https://h8-phase2-gc.vercel.app/apis/blog/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");
      Toastify({
        text: data.message,
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
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="h-screen">
        <main className="p-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Patch Image */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Edit Image</h2>
            <div className="overflow-x-auto">
              <form className="space-y-4" onSubmit={handleUpload}>
                {/* Image */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={e => setFile(e.target.files[0])}
                    name="img"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className={`float-right bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading} // Disable tombol saat loading
                  >
                    {loading ? "Uploading..." : "Upload"} {/* Ubah teks saat upload */}
                  </button>
                </div>
              </form>

              {/* Loading Spinner */}
              {loading && (
                <div className="flex justify-center mt-4">
                  <img src={Loading} alt="Loading" className="flex justify-center mr-2 h-6 w-6" />
                  <p className="ml-2 ">Uploading...</p> {/* Pesan teks "Uploading" */}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
