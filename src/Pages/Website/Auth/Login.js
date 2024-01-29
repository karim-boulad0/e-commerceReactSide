import { useContext, useEffect, useRef, useState } from "react";
import { LOGIN, baseUrl } from "../../../Api/Api";
import axios from "axios";
import Header from "../../../Components/Website/Auth/Header";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import { WindowSize } from "../../../context/WindowContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./auth.css";
export default function Login() {
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isShow, setIsShow] = useState(false);
  const [accept, setAccept] = useState(false);

  const Focus = useRef(null);

  const windowSize = useContext(WindowSize);
  const Size = windowSize.windowWidth;
  const cookie = Cookie();

  // handle focus
  useEffect(() => {
    form.email.length === 0 ? Focus.current.focus() : console.log();
  }, [form.email.length]);

  // handle form change
  function handleForFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //   handle submit
  async function submit(e) {
    setAccept(true);
    e.preventDefault();
    try {
      await axios.post(baseUrl + LOGIN, form).then((data) => {
        const token = data.data.token;
        cookie.set("e-commerce", token);
        data.data.user.role === "2001"
          ? (window.location.pathname = "/index/HomePage")
          : (window.location.pathname = "/dashboard");
      });
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) {
        setErr("email is already been taken ");
      } else {
        if (err.response.status === 422 || err.response.status === 401) {
          setErr("wrong email or password");
        } else {
          setErr("internal server error");
        }
      }
    }
  }
  return (
    <>
      <Header />
      <div className="parent ">
        <div
          className="login container   mt-5 p-5   shadow-lg p-3 mb-5 "
          style={{ width: Size < 600 ? "90%" : "50%" }}
        >
          <Form className="" onSubmit={submit}>
            {/* email */}
            <Form.Group className="mb-3 ">
              <Form.Label htmlFor="email" className="form-label">
                Email
              </Form.Label>
              <Form.Control
                ref={Focus}
                name="email"
                type="email"
                id="email"
                placeholder="name@example.com"
                onChange={handleForFormChange}
                value={form.email}
              />
            </Form.Group>
            {/* password */}
            <Form.Group className="mb-3 pass-group">
              <Form.Label htmlFor="pass" className="form-label pass-label">
                Password
              </Form.Label>
              <Form.Control
                className="pass-input"
                name="password"
                type={isShow ? "text" : "password"}
                id="pass"
                placeholder="Password"
                onChange={handleForFormChange}
                value={form.password}
              />

              <FontAwesomeIcon
                onClick={() => setIsShow((prev) => !prev)}
                className="pass-icon"
                icon={isShow ? faEyeSlash : faEye}
              />
            </Form.Group>

            {err && accept ? (
              <p className="errMsg">wrong email or password</p>
            ) : null}
            {/* button */}
            <div style={{ textAlign: "center" }}>
              <button className="btn btn-primary w-50" type="submit">
                Login
              </button>
            </div>
            {/* google icon for sign in */}
            <div className="google-btn mt-3">
              <a href={`http://127.0.0.1:8000/login-google`}>
                <div>
                  <img
                    className="border p-2 rounded"
                    alt="sign in with google"
                    src="	https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                  />
                  <b className="btn btn-success">Sign In with google</b>
                </div>
              </a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
