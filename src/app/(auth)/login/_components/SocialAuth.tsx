"use client";

import { GoogleLogo, GithubLogo } from "@phosphor-icons/react";
import useAuthFormStore from "@/stores/useAuthFormStore";
import { signInWithOAuth } from "../action";

const SocialAuth = () => {
  const { setError } = useAuthFormStore();

  const handleSocialAuth = async (provider: "google" | "github") => {
    const { error } = await signInWithOAuth(provider);
    if (error) {
      setError(error);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => handleSocialAuth("google")}
        className="btn btn-outline flex-1">
        <GoogleLogo size={24} weight="fill" />
        Google
      </button>
      <button
        onClick={() => handleSocialAuth("github")}
        className="btn btn-outline flex-1">
        <GithubLogo size={24} weight="fill" />
        Github
      </button>
    </div>
  );
};

export default SocialAuth;
