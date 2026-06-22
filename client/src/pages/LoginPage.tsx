import { useState } from "react";
import { loginUser } from "@/services/authService";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  try {
    setData(null);
    setLoading(true);
    setError("");
    
    const response = await loginUser(user);
    setData(response);
    
    localStorage.setItem("token", response.token);
    navigate("/dashboard");

  } catch (err: any) {

    setError(err.response?.data?.message || "Something went wrong");

  } finally {

    setLoading(false);
  
  }
 
};

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Hive
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Sign in to continue
        </p>

        <form 
        className="space-y-5"
        onSubmit={runLogin}>
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
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            { loading ? "Logging in..." : "Login" }
          </button>

          { error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                {error}
            </div>
          )}
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?
          <Link 
          to="/register"
          className="ml-1 text-blue-600 hover:underline"
          >Register</Link>
        </p>

          {data && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <h3>Login Successful</h3>
            <pre> { JSON.stringify(data, null, 2) }</pre>
          </div>
        )}

      </div>
    </div>
  );
};

export default LoginPage;