import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type RegisterFormData, registerSchema } from "@/schemas/auth.schema";
import { Link, useNavigate } from "react-router-dom";
import { registerEmp } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
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

      if (registerEmp.fulfilled.match(result)) navigate("/dashboard");
      else setError("Registration Failed");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const error = err.message;
        setError(error);
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

        <p className="mb-8 text-center text-muted-foreground">Register to continue</p>

        <form className="space-y-5" onSubmit={handleSubmit(runRegister)}>
          <div>
            <label className="block mb-2 text-sm font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-destructive">{errors.username.message}</p>
            )}
          </div>
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
            className="w-full rounded-lg bg-primary py-2 text-primary-foreground transition hover:bg-primary/80"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-destructive">{error}</div>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Have an account?
          <Link className="ml-1 text-primary hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
