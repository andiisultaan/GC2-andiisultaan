import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../assets/Spinner@1x-1.1s-200px-200px.svg";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const access_token = localStorage.access_token;

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/blog/categories`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      {/* Dashboard Widgets */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Posts */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Categories</h2>
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
                    <th className="px-4 py-2 border">No</th>
                    <th className="px-4 py-2 border">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={category.id}>
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{category.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
