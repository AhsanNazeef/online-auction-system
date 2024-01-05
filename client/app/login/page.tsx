import React from "react";
import Logo from "../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../components/loginForm";

const Login = () => {
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
          <div className="mb-2 flex justify-center pt-20">
            <Image src={Logo} alt="logo" className="w-12"/>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
