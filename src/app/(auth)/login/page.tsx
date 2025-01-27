"use client";

import { useEffect } from "react";
import useAuthFormStore from "@/stores/useAuthFormStore";
import AuthForm from "./_components/AuthForm";
import SocialAuth from "./_components/SocialAuth";
import AuthHeader from "./_components/AuthHeader";
import Image from "next/image";

const AuthPage = () => {
  useEffect(() => {
    return () => {
      useAuthFormStore.getState().resetMessages();
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-zinc-950">
      <div className="hidden lg:block flex-1 m-4 rounded-2xl relative">
        <Image
          src="/bg1.png"
          alt="Background Image"
          fill={true}
          style={{ objectFit: "cover", objectPosition: "50% 75%" }}
        />
      </div>

      <div className="w-full lg:w-[40%] p-8 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto shadow-xl p-8 rounded-lg">
          <AuthHeader />

          <AuthForm />

          <div className="divider py-8">Or Register With</div>

          <SocialAuth />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
