import { useFormik } from "formik";
import { FaAddressBook } from "react-icons/fa";
import "./signup.css";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../loading/Loading"
export default function Signup() {
   const [lading, setLading] = useState(true);
  const notify = () => toast("user  added!");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { handleChange, handleSubmit, handleReset, values } = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      role:'user'
    },
    onSubmit: submitHandler,
  });

    useEffect(() => {
      const timeout = setTimeout(() => setLading(false), 2000);
      return () => clearTimeout(timeout);
    }, []);
  
  async function submitHandler(values) {




    try {
      setLoading(true);
      const response = await api.post(`/user`, values);
      console.log("Data Added", response.statusText);
      setLoading(false);
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
    handleReset();
  }
  if (lading) return <LoadingScreen />;
  return (
    <>
      <div
        style={{
          height: "100vh",
          position: "absolute",
          marginTop: "-200px",

          width: "100%",
        }} className="main"
      >
        <div className="container my-5  p-3 glass">
          <h1 className="text-center">Signup</h1>
          <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="form-label">
                name:{" "}
              </label>
              <input
                type="text"
                name="name"
                value={values.name}
                id="name"
                onChange={handleChange}
                className="form-control"
                placeholder="Enter name profile"
               
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email:{" "}
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                id="email"
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email profile"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password:{" "}
              </label>
              <input
                type="text"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter password porfile"
              />
            </div>
            {/* <div>
              <label htmlFor="role" className="form-label">
                role:{" "}
              </label>
              <input
                type="text"
                name="role"
                value={values.role}
                id="role"
                onChange={handleChange}
                className="form-control"
                placeholder="Enter role profile"
                readOnly
              />
            </div> */}
            <div>
              <button type="submit" className="btn btn-warning " onClick={notify}>
                {loading ? (
                  "loading"
                ) : (
                  <span>
                    submit
                    <FaAddressBook />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}
