import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [LoginUser] = useAuthState(auth);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (user || LoginUser?.email) {
      navigate("/");
    }
  }, [user, LoginUser?.email]);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="w-full max-w-md">
        <h1 className="text-5xl mb-8 font-bold ">Login now!</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card flex-shrink-0  shadow-2xl bg-base-100"
        >
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type={"email"}
                {...register("email", {
                  required: "Email Address is required",
                })}
                placeholder="email"
                className="input input-bordered"
              />
              <small className="text-red-500">{errors.email?.message}</small>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={"password"}
                {...register("password", {
                  required: "password Address is required",
                })}
                placeholder="email"
                className="input input-bordered"
              />
              <small className="text-red-500">{errors.password?.message}</small>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
