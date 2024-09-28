import { useState, useEffect } from "react";
import axios from "axios";

export default function PostForm({ handleSubmit, post, nameProp }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/blog/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post?.title ?? "");
      setContent(post?.content ?? "");
      setImgUrl(post?.imgUrl ?? "");
      setCategoryId(post?.categoryId ?? "");
    }
  }, [post]);
  return (
    <>
      <div className="h-screen">
        <main className="p-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Posts */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{nameProp}</h2>
            <div className="overflow-x-auto">
              <form onSubmit={e => handleSubmit(e, title, content, imgUrl, categoryId)} className="space-y-4">
                {/* title */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={e => setTitle(e.target.value)}
                    id="title"
                    name="title"
                    placeholder="Enter title ..."
                    required=""
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 bg-white"
                    value={title}
                  />
                </div>
                {/* Content */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="content">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={e => setContent(e.target.value)}
                    id="content"
                    name="content"
                    placeholder="Enter content ..."
                    required=""
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 bg-white"
                    value={content}
                  />
                </div>
                {/* ImgUrl */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="imgurl">
                    ImgUrl <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="imgurl"
                    onChange={e => setImgUrl(e.target.value)}
                    id="imgurl"
                    name="imgurl"
                    placeholder="Enter imgurl ..."
                    required=""
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 bg-white"
                    value={imgUrl}
                  />
                </div>
                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="category">
                    Categories
                  </label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white"
                    name="category"
                    onChange={e => setCategoryId(e.target.value)}
                    value={categoryId}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Submit Button */}
                <div>
                  <button type="submit" className="float-right bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500">
                    {nameProp}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
