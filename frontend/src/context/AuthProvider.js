import { useReducer, useEffect } from "react";

import AuthContext from "./auth-context";

const defaultAuthState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': 
    console.log("Logging in")
      return { user: action.payload }
    case 'LOGOUT': 
      return { user: null }
    default: 
      return state
  }
};

const AuthProvider = (props) => {
  const [state, dispatchAuthAction] = useReducer(
    authReducer,
    defaultAuthState
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatchAuthAction({ type: 'LOGIN', payload: user })
    }
  }, [])

  console.log('AuthContext state: ', state)

  const logout = () => {
    dispatchAuthAction({ type: "LOGOUT"});
  };

  const login = (payload) => {
    dispatchAuthAction({ type: "LOGIN", payload});
  };

  const authContext = {
    ...state,
    logout,
    login
  }

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
