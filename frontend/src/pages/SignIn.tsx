import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore, type SignInFormData } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";

function SignIn() {
  const [showpassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<SignInFormData>();

  const { isLoading, signIn } = useAuthStore();

  const onSubmit = async (data: SignInFormData) => {
    await signIn(data);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageCircle className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign In to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="form-control flex flex-col gap-2">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <label className="input validator w-full rounded-lg size-14">
                <Mail className="size-5 text-base-content/40" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  {...register("email")}
                />
              </label>
            </div>

            {/* password */}
            <div className="form-control flex flex-col gap-2">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>

              <label className="input validator w-full rounded-lg size-14">
                <Lock className="size-5 text-base-content/40" />
                <input
                  type={showpassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  minLength={6}
                  {...register("password")}
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showpassword)}
                >
                  {showpassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </label>
            </div>

            <button className="btn btn-primary w-full rounded-lg size-14">
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  loading
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Welcome back!"
        subTitle="Sign in to your conversations and catch up with your messages."
      />
    </div>
  );
}

export default SignIn;
