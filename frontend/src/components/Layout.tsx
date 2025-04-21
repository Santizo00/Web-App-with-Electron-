import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-screen h-screen flex bg-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-full w-full flex flex-col overflow-hidden">
        <div className="flex-1 w-full p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
