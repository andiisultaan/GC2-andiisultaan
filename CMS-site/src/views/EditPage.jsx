import axios from "axios";
import PostForm from "../components/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from "toastify-js";
import { useState } from "react";
import { useEffect } from "react";

export default function AddPage() {
  const [post, setPost] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e, title, content, imgUrl, categoryId) {
    e.preventDefault();
    try {
      const body = { title, content, imgUrl, categoryId: +categoryId };
      const { data } = await axios.put(`https://h8-phase2-gc.vercel.app/apis/blog/posts/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");
      Toastify({
        text: `Succedd update post ${data.data.title}`,
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

  async function fetchPost() {
    try {
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/blog/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setPost(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <PostForm handleSubmit={handleSubmit} post={post} nameProp="Edit Post" />
    </>
  );
}
