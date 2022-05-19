import React, { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../Firebase.init";
import useToken from "../Hooks/useToken";

const Signup = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});
  const navigate = useNavigate();
  const [token] = useToken(user || gUser);

  let errorMessage;

  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleGoogleSubmit = () => {
    signInWithGoogle();
  };

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  if (loading || gLoading || updating) {
    return <h1>Loading...</h1>;
  }

  if (error || gError || updateError) {
    errorMessage = (
      <span className="text-red-500">{error?.message || gError?.message}</span>
    );
  }

  return (
    <section className="min-h-[calc(100vh-80px)] flex justify-center items-center py-16">
      <div className="card w-96 bg-neutral shadow-lg">
        <div className="card-body">
          <h2 className="text-center text-2xl text-accent capitalize font-bold">
            Signup
          </h2>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="font-medium">Name:</label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full mt-1"
              />
              {errors.name?.type === "required" && (
                <span className="text-red-500 mt-2 block">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div className="mt-4">
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
              Signup
            </button>
          </form>
          <p className="text-accent text-sm text-center font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary font-medium">
              Login
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

export default Signup;
