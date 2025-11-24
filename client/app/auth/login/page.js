"use client";
import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            console.log("Logging in with:", form);
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            login(res.data);
            router.push("/");
        } catch (err) {
            // Handle error response
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Login failed. Please try again.");
            }
            console.error("Login error:", err);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    className="w-full border p-2" 
                    onChange={(e) => setForm({ ...form, username: e.target.value })} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full border p-2" 
                    onChange={(e) => setForm({ ...form, password: e.target.value })} 
                    required
                />
                <button className="bg-black text-white px-4 py-2 rounded">Login</button>
            </form>
        </div>
    );
}
