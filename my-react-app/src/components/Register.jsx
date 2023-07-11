import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../services/api";
import Header from "./Header";
function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const handleInputChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const result = await register(form);
    if (result.status === 200) {
      if (result.data.status === 201) {
        setErrors(result.data.errors);
        toast.error(result.data.message);
      } else {
        toast.success(result.data.message);
      }
    } else {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <>
    <Header />
    <div className="container">
      <ToastContainer />
      <div className="row justify-content-center mt-4">
        <div className="col-lg-5 card border-primary mt-4">
          <div className="card-header h4 text-center">
            Register An Account
          </div>

          <div className="card-body">
            <div className="form-group">
              <label className="col-form-label mt-4">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Your Name"
              />
              {errors && errors.name && (
                <div className="text-danger">{errors.name[0]}</div>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label mt-4">username</label>
              <input
                type="text"
                name="username"
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter username"
              />
              {errors && errors.username && (
                <div className="text-danger">{errors.username[0]}</div>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label mt-4">Email</label>
              <input
                type="text"
                name="email"
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Your email"
              />
              {errors && errors.email && (
                <div className="text-danger">{errors.email[0]}</div>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label mt-4">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Your Password"
              />
              {errors && errors.password && (
                <div className="text-danger">{errors.password[0]}</div>
              )}
            </div>
            <div className="row justify-content-md-center form-group mt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="col-sm-6 btn btn-outline-secondary center"
              >
                Register
              </button>   
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register; 





