import React from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = data => {
        if (data.email) {

            createUserWithEmailAndPassword(data.email, data.password)
        }
    };
    
    return (
        <div class="hero min-h-screen bg-base-200">
        <div class="w-full max-w-md">
            <h1 class="text-5xl mb-8 font-bold ">SignUp now!</h1>

            <form onSubmit={handleSubmit(onSubmit)} class="card flex-shrink-0  shadow-2xl bg-base-100">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Full Name</span>
                        </label>

                        <input type={'text'} {...register("name", { required: "name Address is required" })} placeholder="Full Name" class="input input-bordered" />
                        <small className='text-red-500'>{errors.name?.message}</small>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>

                        <input type={'email'} {...register("email", { required: "Email Address is required" })} placeholder="email" class="input input-bordered" />
                        <small className='text-red-500'>{errors.email?.message}</small>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input type={'password'} {...register("password", { required: "password Address is required" })} placeholder="email" class="input input-bordered" />
                        <small className='text-red-500'>{errors.password?.message}</small>
                        <label class="label">
                            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div class="form-control mt-6">
                        <button type='submit' class="btn btn-primary">Login</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
    );
};

export default Signup;