import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const shuffleArray = array => {
  return array.sort(() => Math.random() - 0.5);
};

export default function DetailPage() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const { id } = useParams();

  async function fetchPost() {
    try {
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/blog/posts/${id}`);
      setPost(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPosts() {
    try {
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/blog/posts`);
      setPosts(data.data.query);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPost();
    fetchPosts();
  }, []);

  const randomPosts = shuffleArray([...posts]).slice(0, 3);

  return (
    <>
      <div className="bg-white">
        <section
          className="hero h-96 bg-cover bg-center"
          style={{
            backgroundImage: `url(${post.imgUrl})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60" />
          <div className="hero-content text-center text-white">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">{post.title}</h1>
              <p className="mb-5">
                <span>By :</span> {post?.User?.username}
              </p>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="my-12 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
            <p className="text-lg leading-relaxed text-gray-600 mb-4">{post.content}</p>
          </div>
        </section>

        <section className="my-12 px-6">
          <div className="max-w-4xl mx-auto flex items-center space-x-4">
            <img className="w-16 h-16 rounded-full" src="https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg" alt="Author Name" />
            <div>
              <h4 className="text-lg font-semibold">{post?.User?.username}</h4>
              <p className="text-sm text-gray-600">
                {new Date(post.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </section>

        <section className="my-12 px-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Other Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomPosts.map(post => (
              <Card post={post} key={post.id} />
            ))}
          </div>
        </section>

        <section>
          <div></div>
        </section>
      </div>
    </>
  );
}
