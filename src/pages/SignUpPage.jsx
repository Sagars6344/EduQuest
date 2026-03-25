import React from "react";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/image/banner4.gif"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Loading */}
      <ClerkLoading>
        <div className="text-white font-bold text-lg animate-pulse">
          Loading sign up form...
        </div>
      </ClerkLoading>

      {/* Clerk Ready */}
      <ClerkLoaded>
        <SignUp 
          path="/sign-up" 
          routing="path" 
          signInUrl="/sign-in"
          afterSignUpUrl="/select-age"   // ✅ important flow
        />
      </ClerkLoaded>
    </div>
  );
};

export default SignUpPage;