import React from 'react';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';


const Login = () => {
    const { register,formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
  const onSubmit = data =>{
      
    signInWithEmailAndPassword(data.email, data.password)
  };
    
    return (
        <div>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Login now!</h1>
                        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                   
                    <form onSubmit={handleSubmit(onSubmit)} class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div class="card-body">
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
        </div>
    );
};

export default Login;