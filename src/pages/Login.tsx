import React, { useState } from "react";
import { signIn, signInWithGoogle } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to log in");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Signed in user: ", user.displayName, user.photoURL);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to log in with google");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
        <button type="button" onClick={handleGoogleSignIn} className="w-full bg-red-500 text-white p-2 rounded">
          Sign in with google
        </button>
        <p>
          Don't have an account?
          <a href="/register" className="m-5">Register here</a>
        </p>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
