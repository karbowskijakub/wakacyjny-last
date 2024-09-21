import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Adjust the import path if needed
import ProfileSidebar from "@/components/ProfileSidebar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center">
    <div className="flex h-screen w-3/4">
    <ProfileSidebar/>

      
      <main className="flex-1 p-3">
        {children ? children : <Outlet />} 
      </main>
      <Sidebar />
    </div>
    </div>
  );
};

export default Layout;