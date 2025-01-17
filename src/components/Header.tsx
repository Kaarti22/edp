import { auth } from "@/firebase/firebase.config";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="w-full p-5 bg-slate-200 flex justify-between items-center">
      <img src="/logo.png" alt="logo" className="h-10" />
      <div className="font-semibold text-2xl">{title}</div>
      <div className="relative">
        <img
          src="/profile-photo.png"
          alt="Profile"
          className="h-10 w-10 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-auto bg-white shadow-lg rounded-lg p-4">
            <div className="text-gray-700 font-medium mb-2">
              {auth.currentUser?.displayName || "Guest"}
            </div>
            <div className="text-gray-500 text-sm">
              Email: {auth.currentUser?.email || "No email"}
            </div>
            <button
              className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
