import { useState, useContext } from "react";
import AuthContext from "../context/auth-context";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const AuthCtx = useContext(AuthContext);

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      const { email, token } = json;
      // Save user to local storage
      localStorage.setItem("user", JSON.stringify({ email, token }));
      localStorage.setItem("siteTutorial", "true")

      // Update auth context
      AuthCtx.login({ email, token });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
