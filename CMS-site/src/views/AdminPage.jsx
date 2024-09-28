import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../assets/Spinner@1x-1.1s-200px-200px.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faTrashCan, faPenToSquare, faImage } from "@fortawesome/free-solid-svg-icons";
import Toastify from "toastify-js";

export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  async function fetchPosts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/blog/posts`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setPosts(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/blog/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.log();
    }
  }

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`https://h8-phase2-gc.vercel.app/apis/blog/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      fetchPosts();

      Toastify({
        text: `Succedd delete data`,
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

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  function getCategoryName(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Unknown";
  }

  return (
    <>
      {/* Dashboard Widgets */}
      <div className={`${posts.length > 0 ? "" : "h-screen"}`}>
        <main className="p-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Posts */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Posts</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                <FontAwesomeIcon icon={faSquarePlus} className="mr-2" />
                <Link to="/add-post">Add Post</Link>
              </button>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="mt-32 flex justify-center items-center">
                  <img src={Loading} />
                </div>
              ) : (
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="px-4 py-2 border w-12">No</th>
                      <th className="px-2 py-3 border w-1/5">Title</th>
                      <th className="px-4 py-2 border">Image</th>
                      <th className="px-4 py-2 border w-1/4">Content</th>
                      <th className="px-4 py-2 border">Category</th>
                      <th className="px-4 py-2 border">Author</th>
                      <th className="px-4 py-2 border w-1/5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <tr key={post?.id}>
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-2 py-3 border w-1/5">{post?.title.length > 100 ? post?.title.slice(0, 100) + "..." : post?.title}</td>
                        <td className="px-4 py-2 border">
                          <img src={post?.imgUrl} alt={post.title} className="w-16 h-16 object-cover" />
                        </td>
                        <td className="px-4 py-2 border w-1/4">{post?.content.slice(0, 65)}...</td>
                        <td className="px-4 py-2 border w-1/5">{getCategoryName(post?.categoryId)}</td>
                        <td className="px-4 py-2 border ">{post?.User?.username}</td>
                        <td className="px-4 py-2 border w-1/5">
                          <div className="flex space-x-2">
                            <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(post.id)}>
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                            <Link to={`/edit/${post.id}`}>
                              <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </button>
                            </Link>
                            <Link to={`/patch/${post.id}`}>
                              <button className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">
                                <FontAwesomeIcon icon={faImage} />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
