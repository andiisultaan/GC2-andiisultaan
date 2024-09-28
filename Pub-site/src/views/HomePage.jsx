import "../assets/css/font.css";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import loadingSvg from "../assets/Spinner@1x-1.1s-200px-200px.svg";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [categories, setCategories] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");

  async function fetchPosts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/blog/posts?q=${search}&page=${currentPage}&sort=${sortOrder}&i=${searchCategory}&limit=12`);

      setPosts(data.data.query);
      setTotalPage(data.data.pagination.totalPage);
      setCurrentPage(data.data.pagination.currentPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/blog/categories`);
      setCategories(data.data);
    } catch (error) {
      console.log();
    }
  }

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [search, currentPage, sortOrder, searchCategory]);

  const changePage = number => {
    setCurrentPage(number);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div id="home" className="bg-white">
        {/* Hero Section */}
        <section
          className="hero h-80 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://r4.wallpaperflare.com/wallpaper/246/739/689/digital-digital-art-artwork-illustration-abstract-hd-wallpaper-28f60d7850600cb8e04c418e2872141a.jpg")',
          }}
        >
          <div className="hero-overlay bg-opacity-50" />
          <div className="hero-content text-center text-white">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Discover Cutting-Edge IT Innovations</h1>
              <p className="mb-5">Explore the latest advancements in technology and stay ahead in the fast-evolving IT landscape.</p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="my-4 px-6 flex flex-col md:flex-row justify-center items-center bg-white gap-4">
          <select name="sort" className="select select-bordered bg-white text-slate-950" onChange={e => setSortOrder(e.target.value)}>
            <option value="ASC">Sort by ASC</option>
            <option value="DESC">Sort by DESC</option>
          </select>

          <input type="search" name="search" placeholder="Search posts..." className="input input-bordered w-full max-w-xs bg-white text-slate-950" onChange={e => setSearch(e.target.value)} />

          <select className="select select-bordered bg-white text-slate-950" onChange={e => setSearchCategory(e.target.value)} defaultValue="">
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </section>

        {/* Topics */}
        <section className="my-12 px-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Topics</h2>

          {loading ? (
            <>
              <div className="flex flex-col justify-center items-center h-screen">
                <img src={loadingSvg} alt="" />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.map(post => {
                  return <Card post={post} key={post.id} />;
                })}
              </div>
            </>
          )}
        </section>

        {/* Pagination Section */}
        <div className="flex justify-center my-6">
          <nav>
            <ul className="inline-flex -space-x-px">
              <li>
                <button onClick={prevPage} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700" disabled={currentPage === 1}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPage }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => changePage(index + 1)}
                    className={`px-3 py-2 leading-tight border ${currentPage === index + 1 ? "bg-blue-500 text-white border-blue-600" : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"}`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={nextPage} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700" disabled={currentPage === totalPage}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Additional Section Before Footer */}
        <section>
          <div
            className="hero h-96 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://r4.wallpaperflare.com/wallpaper/400/646/349/digital-digital-art-artwork-3d-night-hd-wallpaper-39b0982d41ca2dbbc667d86ff091a61d.jpg")',
            }}
          >
            <div className="hero-overlay bg-opacity-60" />
            <div className="hero-content text-center text-white">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">"The only way to do great work is to love what you do."</h1>
                <p className="mb-5">- Steve Jobs</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
