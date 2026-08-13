import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { useAppDispatch } from "@/app/hooks";
import { loginEmp } from "@/features/auth/authSlice";

const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runLogin = async (data: LoginFormData) => {
  try {
    setLoading(true);
    setError("");
    
    const result = await dispatch(loginEmp(data));

    if(loginEmp.fulfilled.match(result)) {
      navigate("/dashboard"); 
    } else {
      setError("Login failed");
    }

    console.log("Result: ",result);
    console.log("completed login");
    


  } catch (err: unknown) {

    if(err instanceof Error) {
      setError(err.message);
    }
    else {
      setError("Something went wrong");
    }

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
        onSubmit={handleSubmit(runLogin)}>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {
              errors.email && 
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            }
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              { ...register("password") }
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {
              errors.password && 
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            }
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

      </div>
    </div>
  );
};

export default LoginPage;
