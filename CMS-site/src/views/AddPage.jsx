import axios from "axios";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function AddPage() {
  const navigate = useNavigate();

  async function handleSubmit(e, title, content, imgUrl, categoryId) {
    e.preventDefault();
    try {
      const body = { title, content, imgUrl, categoryId: +categoryId };
      const { data } = await axios.post(`https://h8-phase2-gc.vercel.app/apis/blog/posts`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");
      Toastify({
        text: `Succedd add new post ${data.data.title}`,
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
    }
  }

  return (
    <>
      <PostForm handleSubmit={handleSubmit} nameProp="Add Post" />
    </>
  );
}
