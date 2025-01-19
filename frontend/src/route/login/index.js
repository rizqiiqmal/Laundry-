import React, { useState } from "react";  
  
function Login() {  
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");  
  const [error, setError] = useState("");  
  
  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setError(""); // Reset error message  
  
    try {  
      const response = await fetch("http://localhost:5000/login", { // Pastikan URL sesuai  
        method: "POST",  
        headers: {  
          "Content-Type": "application/x-www-form-urlencoded",  
        },  
        body: new URLSearchParams({  
          username: username,  
          password: password,  
        }),  
      });  
  
      const data = await response.json();  
  
      if (response.ok) {  
        // Login berhasil  
        alert("Login successful!");  
        // Simpan informasi pengguna di sessionStorage  
        sessionStorage.setItem("user", JSON.stringify(data));  
        // Redirect ke halaman dashboard  
        window.location.href = "/dashboard"; // Ganti dengan URL yang sesuai  
      } else {  
        // Tampilkan pesan kesalahan  
        setError(data.message || "Login failed!");  
      }  
    } catch (error) {  
      console.error("Error:", error);  
      setError("Terjadi kesalahan saat menghubungi server.");  
    }  
  };  
  
  return (  
    <div className="flex items-center justify-center min-h-screen bg-gray-100">  
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">  
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">  
          Login  
        </h2>  
        {error && <p className="text-red-500 text-center">{error}</p>}  
        <form onSubmit={handleSubmit}>  
          <div className="mb-4">  
            <label  
              htmlFor="username"  
              className="block mb-2 text-sm font-medium text-gray-600"  
            >  
              Username  
            </label>  
            <input  
              type="text"  
              id="username"  
              value={username}  
              onChange={(e) => setUsername(e.target.value)}  
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"  
              placeholder="Enter your username"  
              required  
            />  
          </div>  
          <div className="mb-6">  
            <label  
              htmlFor="password"  
              className="block mb-2 text-sm font-medium text-gray-600"  
            >  
              Password  
            </label>  
            <input  
              type="password"  
              id="password"  
              value={password}  
              onChange={(e) => setPassword(e.target.value)}  
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"  
              placeholder="Enter your password"  
              required  
            />  
          </div>  
          <button  
            type="submit"  
            className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"  
          >  
            Login  
          </button>  
        </form>   
      </div>  
    </div>  
  );  
}  
  
export default Login;  
