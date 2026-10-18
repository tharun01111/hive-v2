import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { useAppDispatch } from "@/app/hooks";
import { loginEmp } from "@/features/auth/authSlice";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runLogin = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError("");

      const result = await dispatch(loginEmp(data));

      if (loginEmp.fulfilled.match(result)) {
        navigate("/dashboard");
      } else {
        setError("Login failed");
      }

      console.log("Result: ", result);
      console.log("completed login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Hive</h1>

        <p className="mb-8 text-center text-muted-foreground">Sign in to continue</p>

        <form className="space-y-5" onSubmit={handleSubmit(runLogin)}>
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary py-2 text-primary-foreground transition hover:bg-primary/80"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-destructive">{error}</div>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?
          <Link to="/register" className="ml-1 text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
