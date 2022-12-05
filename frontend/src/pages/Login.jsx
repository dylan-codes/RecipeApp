import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/UI/Card";
import { useLogin } from "../hooks/use-login";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await login(email, password);

    if (!error) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </h1>
        <p>Login and start your recipe journey</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="sumit" className="btn btn-block" disabled={isLoading}>
              Submit
            </button>
            {error && <div className="validation-error">{error}</div>}
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
