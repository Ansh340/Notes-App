import React from "react";

const CustomErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition duration-300"
        >
          Go back home
        </a>
      </div>
    </div>
  );
};

export default CustomErrorPage;
