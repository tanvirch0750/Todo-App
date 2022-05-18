import React, { useEffect } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../Firebase.init";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, errorReset] =
    useSendPasswordResetEmail(auth);
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({});

  let errorMessage;

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const handleGoogleSubmit = () => {
    signInWithGoogle();
  };

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  const email = watch("email");
  function validateEmail() {
    let validRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  const handleResetEmail = async () => {
    if (!validateEmail()) {
      alert("Plese Enter your email");
    } else {
      await sendPasswordResetEmail(email);
      alert("Email verification email sent to your email");
    }
  };

  if (error || gError) {
    errorMessage = (
      <span className="text-red-500">{error?.message || gError?.message}</span>
    );
  }

  useEffect(() => {
    if (user || gUser) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  if (loading || gLoading) {
    return <h1>Loading..</h1>;
  }

  return (
    <section className="min-h-[calc(100vh-80px)] flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="text-center text-2xl text-accent capitalize font-bold">
            Login
          </h2>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="font-medium">Email:</label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid email",
                  },
                })}
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full mt-1"
              />
              {errors.email?.type === "required" && (
                <span className="text-red-500 mt-2 block">
                  {errors?.email?.message}
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="text-red-500 mt-2 block">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div className="mt-4">
              <label className="font-medium">Password:</label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password minimum length should be 6",
                  },
                })}
                type="password"
                placeholder="Your Password"
                className="input input-bordered w-full mt-1"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500 mt-2 block">
                  {errors?.password?.message}
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500 mt-2 block">
                  {errors?.password?.message}
                </span>
              )}
            </div>
            {errorMessage}
            <button
              type="submit"
              className="btn btn-accent input input-bordered w-full uppercase mt-4"
            >
              Login
            </button>
          </form>
          <p className="text-accent text-sm text-center font-medium">
            Forgot your password?{" "}
            <span
              className="text-secondary font-medium cursor-pointer"
              onClick={handleResetEmail}
            >
              Reset your password
            </span>
          </p>
          <p className="text-accent text-sm text-center font-medium">
            New to Todo App?{" "}
            <Link to="/signup" className="text-secondary font-medium">
              Crete a new account
            </Link>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleSubmit}
            className="btn btn-outline btn-accent input input-bordered w-full uppercase"
          >
            continue with google
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
