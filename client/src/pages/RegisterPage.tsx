import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type RegisterFormData, registerSchema } from "@/schemas/auth.schema";
import { Link, useNavigate } from "react-router-dom";
import { registerEmp } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks";

const RegisterPage = () => {

  const {register, handleSubmit, formState: { errors }} = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const runRegister = async (data: RegisterFormData) => {
    try {
      setError("");
      setLoading(true);
      
      const result = await dispatch(registerEmp(data));

      if(registerEmp.fulfilled.match(result))
        navigate("/dashboard");
      else 
        setError("Login Failed");
      
    } catch(err: unknown) {

      if(err instanceof Error){
        const error = err.message;
        setError(error);
      } 
      else {
        setError( "Something went wrong");
      }

    } finally {
      setLoading(false);
    }
    
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
        onSubmit={handleSubmit(runRegister)}
        >
          <div>
            <label className="block mb-2 text-sm font-medium">
              Username
            </label>
            <input 
            type="text"
            placeholder="Enter your username"
            {...register("username")}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && 
            <p className="text-red-500 text-sm mt-1">
              { errors.username.message }
            </p>
            }
          </div>
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
            {errors.email && 
            <p className="text-red-500 text-sm mt-1">
              { errors.email.message }
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
              {...register("password")}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && 
            <p className="text-red-500 text-sm mt-1">
              { errors.password.message }
            </p>
            }
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
      </div>
    </div>
  );
}

export default RegisterPage

