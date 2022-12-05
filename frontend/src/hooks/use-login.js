import { useState, useContext } from "react";
import AuthContext from "../context/auth-context";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const AuthCtx = useContext(AuthContext);

  const login = async (email, password) => {
    setIsLoading(true);

    setError(null);

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      const {  email, token } = json;
      // Save user to local storage
      localStorage.setItem("user", JSON.stringify({email, token}));

      // Update auth context
      AuthCtx.login({ email, token });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
