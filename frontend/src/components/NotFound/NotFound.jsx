
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
