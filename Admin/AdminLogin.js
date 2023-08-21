import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import axios from "axios";

export default function ULoginPage() {
  const InitialErrors = {
    userName: { required: false },
    password: { required: false },
    custom_error: null,
  };
  const [error, seterror] = useState(InitialErrors);
  const [loading, setloading] = useState(false);
  const initialValues = { userName: "", password: "" };
  const [formValue, setFormValue] = useState(initialValues);
  const Navigate=useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormValue({ ...formValue, [id]: value });
  };

  const LoginSubmit = async () => {
    setloading(true);
    try {
      const res = await axios.get(
        `http://localhost:9000/admin/login/${formValue.userName}/${formValue.password}`
      );
      setFormValue(initialValues);
      console.log(res.data);
      localStorage.setItem("authToken", res.data);
      if (res.data !== null && res.data !== "") {
       Navigate("/adminhome")
      } else {
        alert("Enter the valid user!");
      }
    } catch (err) {
      if (err.code === "ERR_BAD_REQUEST") {
        seterror({ ...error, custom_error: "Invalid Username or Password" });
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <section className="login-block">
      <div className="container1">
        <div className="row ">
          <div className="login-sec">
            <h2 className="login-sec-heads">Admin</h2>
            <form className="login-form" action="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  value={formValue.userName}
                  onChange={handleChange}
                  placeholder="userName"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className="text-uppercase"
                >
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={formValue.password}
                  onChange={handleChange}
                  placeholder="password"
                  id="password"
                />
              </div>
              <div className="form-group">
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : null}
                <span className="text-danger">
                  {error.custom_error ? <p>{error.custom_error}</p> : null}
                </span>
                <button
                  className="btn btn-primary float-center"
                  type="button"
                  onClick={LoginSubmit}
                >
                  Login
                </button>
              </div>
              <div className="clearfix"></div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
