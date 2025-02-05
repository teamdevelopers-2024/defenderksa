import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo_only.png";
import logoText from "../../assets/icons/logo-text.png";
import Swal from "sweetalert2";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear auth token or session data
        localStorage.removeItem("DefenderauthToken");
  
        // Navigate to the login page
        navigate("/admin/login");
  
        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been successfully logged out.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };
  
  return (
    <div className="w-64 bg-gray-800 text-white h-screen items-center flex justify-center">
      <h1 className="text-2xl font-bold p-4 text-center">
           <div className="flex flex-col items-center ">
                <img className="h-[3.5vw] pt-[0.5vw]" src={logo} alt="Logo" />
                <img className="h-[3vw] w-auto" src={logoText} alt="Logo Text" />
              </div>
      </h1>
      <div className="mb-6 absolute w-64 bottom-0">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
