import { useState } from "react";
import { useAuthStore, type SignUpFormData } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";

function SignUp() {
  const [showpassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<SignUpFormData>();

  const { isLoading, signUp } = useAuthStore();

  const onSubmit = async (data: SignUpFormData) => {
    await signUp(data);
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
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* fullName */}
            <div className="form-control flex flex-col gap-2">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>

              <label className="input validator w-full rounded-lg size-14">
                <User className="size-5 text-base-content/40" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  {...register("fullName")}
                  minLength={3}
                />
              </label>
            </div>

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
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Join out Community"
        subTitle="Connect with Friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
}

export default SignUp;
