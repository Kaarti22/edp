import React, { useState } from "react";
import { signUp, signInWithGoogle } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to register");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle(); // Works for both sign-in and sign-up
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to register with Google");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleRegister} className="p-6 bg-white shadow-md rounded">
        <h2 className="text-lg font-bold mb-4">Register</h2>
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-3">
          Register
        </button>
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full bg-red-500 text-white p-2 rounded"
        >
          Sign up with Google
        </button>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
