import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/UI/Card";
import { useSignup } from "../hooks/use-signup";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const {signup, error, isLoading} = useSignup()

  const { name, email, password, password2 } = formData;

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== password2) {
      throw new Error("The entered passwords do not match");
    }

    await signup(name, email, password)

/*     const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json; */
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FontAwesomeIcon icon={faUser} /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
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
            <input
              type="text"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Please confirm your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="sumit" className="btn btn-block" disabled={isLoading}>
              Submit
            </button>
            {error && <div>{error}</div>}
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
