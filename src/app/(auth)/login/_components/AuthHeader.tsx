"use client";

import useAuthFormStore from "@/stores/useAuthFormStore";

const AuthHeader = () => {
  const { authMode, setAuthMode, resetMessages } = useAuthFormStore();

  const handleModeChange = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
    resetMessages();
  };

  return (
    <div className="mb-10 text-center">
      <h2 className="text-4xl font-bold text-white mb-4">
        {authMode === "login"
          ? "Welcome Back"
          : authMode === "register"
          ? "Create Account"
          : "Reset Password"}
      </h2>
      <p className="text-zinc-400">
        {authMode === "login"
          ? "Don't have an account? "
          : "Already have an account? "}
        <span
          onClick={handleModeChange}
          className="link text-orange-500 cursor-pointer">
          {authMode === "login" ? "Sign up" : "Sign in"}
        </span>
      </p>
    </div>
  );
};

export default AuthHeader;
