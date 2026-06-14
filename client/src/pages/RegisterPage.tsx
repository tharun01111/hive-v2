import { useState } from "react"
import { registerUser } from "../api/auth";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const runRegister = async (e: any) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      
      const response = await registerUser(user);
      setData(response);

    } catch(err: any) {

      const error = err.response?.data?.message;
      setError(error || "Something went wrong");

    } finally {
      setLoading(false);
    }
  
    setUser({ username: "", email: "", password: "" });
  }
   
    return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Hive
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Register to continue
        </p>

        <form 
        className="space-y-5"
        onSubmit={runRegister}
        >
          <div>
            <label className="block mb-2 text-sm font-medium">
              Username
            </label>
            <input 
            type="text"
            placeholder="Enter your username"
            value={user.username}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            { loading ? "Registering...": "Register" }
          </button>

          { error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              { error }
            </div>
          )}
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Have an account?
          <Link 
          className="ml-1 text-blue-600 hover:underline"
          to="/login"
          >Login</Link>
        </p>
        {data && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <h3>Registration Successful</h3>

            <p>ID: {data.user.id}</p>
            <p>Email: {data.user.email}</p>
            <p>Username: {data.user.username}</p>
            <p>Role: {data.user.role}</p>
            <p>Token: {data.token}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPage

