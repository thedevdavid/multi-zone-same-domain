"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const returnUrl = searchParams.get("next") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // await signIn({ email, password, returnUrl });
    alert(`Email: ${email}, Password: ${password}, Return URL: ${returnUrl}`);
    router.push(returnUrl);
  };

  return (
    <div className="login-page">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {/* Login form fields */}
        <div className="return-info">
          {returnUrl !== "/" && <p>You'll be redirected back to {returnUrl}</p>}
        </div>
      </form>
    </div>
  );
}
