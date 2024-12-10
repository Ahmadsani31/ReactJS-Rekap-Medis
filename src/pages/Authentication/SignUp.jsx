import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa6";

import Hospital from './../../images/logo/hospital.png';

import API_URL from '@/config/api';

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [comfirmPasswordVisible, setComfirmPasswordVisible] = useState(false);

  const [formLogin, setFormLogin] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  })

  const handelInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value)
    setFormLogin({ ...formLogin, [name]: value });
  }

  const handelLogin = async (event) => {
    event.preventDefault();
    // console.log(formLogin)
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(formLogin),
      });
      if (response.ok) {
        setIsLoading(false);
      }
      const data = await response.json();
      console.log(data.data.error);

      if (data.status == false) {
        setError(data.data.error)
      } else {
        setFormLogin({
          name: "",
          email: "",
          password: "",
          password_confirmation: ""
        })
        navigate('/');
      }
      console.log(error);



    } catch (error) {
      console.log(error);

      setError(error.message);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <img className="h-auto max-w-lg mx-auto rounded-lg w-25" src={Hospital} alt="image description" />
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
              e-Klnik Sign Up
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handelLogin}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                  value={formLogin.name} onChange={handelInput} />
                {error.name && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {error.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                  value={formLogin.email} onChange={handelInput} />
                {error.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {error.email}</p>}
              </div>
              <div>
                <div className="max-w-sm">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <div className="relative">
                    <input id="password" type={passwordVisible ? `text` : `password`} name="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password"
                      value={formLogin.password} onChange={handelInput} />
                    <span className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500" onClick={() => setPasswordVisible(!passwordVisible)}>
                      {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {error.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {error.password}</p>}
                </div>
              </div>
              <div>
                <div className="max-w-sm">
                  <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-type Password</label>
                  <div className="relative">
                    <input id="password_confirmation" type={comfirmPasswordVisible ? `text` : `password`} name="password_confirmation" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password"
                      value={formLogin.password_confirmation} onChange={handelInput} />
                    <span className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500" onClick={() => setComfirmPasswordVisible(!comfirmPasswordVisible)}>
                      {comfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {error.password_confirmation && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {error.password_confirmation}</p>}
                </div>
              </div>
              {isLoading ? (
                <button type="submit" className="w-full text-white bg-black-2 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Loading...
                </button>
              ) : (
                <button type="submit" className="w-full text-white bg-black-2 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link to="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

