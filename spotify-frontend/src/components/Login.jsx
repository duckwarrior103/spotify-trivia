import React from "react";

const Login = () => {
  const handleLogin = () => {
    // Redirect to your backend's /login endpoint
    window.location.href = "http://localhost:5001/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600"
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
