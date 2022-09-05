import React from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";

const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (data) => {
    if (data.email) {
      createUserWithEmailAndPassword(data.email, data.password);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="w-full max-w-md">
        <h1 className="text-5xl mb-8 font-bold ">SignUp now!</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card flex-shrink-0  shadow-2xl bg-base-100"
        >
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>

              <input
                type={"text"}
                {...register("name", { required: "name Address is required" })}
                placeholder="Full Name"
                className="input input-bordered"
              />
              <small className="text-red-500">{errors.name?.message}</small>
            </div>
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
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

export default Signup;
