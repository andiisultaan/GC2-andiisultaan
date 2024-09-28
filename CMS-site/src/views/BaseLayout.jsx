import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function BaseLayout() {
  return (
    <>
      <div className="flex h-max bg-[#E5E5E5] text-black">
        <Navbar />
        <div className="flex-1 flex flex-col font-noto-sans">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}
