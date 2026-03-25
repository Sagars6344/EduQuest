import React from "react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/image/banner4.gif"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Loading state */}
      <ClerkLoading>
        <div className="text-white font-bold text-lg animate-pulse">
          Loading sign in form...
        </div>
      </ClerkLoading>

      {/* Clerk ready */}
      <ClerkLoaded>
        <SignIn 
          path="/sign-in" 
          routing="path" 
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"   // ✅ extra improvement
        />
      </ClerkLoaded>
    </div>
  );
};

export default SignInPage;