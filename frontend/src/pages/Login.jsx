import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/UI/Card";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (event) => {
    setFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
    }))
  };

  const onSubmit = (event) => {
    event.preventDefault()
  }

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
            <button type="sumit" className="btn btn-block">
                Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
