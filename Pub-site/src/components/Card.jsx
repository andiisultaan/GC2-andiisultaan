import { Link } from "react-router-dom";

export default function Card({ post }) {
  return (
    <>
      <div className="card bg-white shadow-xl rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105">
        <figure className="h-48">
          <img className="w-full h-full object-cover" src={post.imgUrl} alt="Post" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-gray-800">{post.title}</h2>
          <p className="text-gray-900 gowun-batang-reguler">{post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}</p>
          <Link to={`/detail/${post.id}`} className="mt-2 inline-block text-blue-600 hover:underline float-right">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
}
