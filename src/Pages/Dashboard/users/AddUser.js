import { useContext, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { useNavigate } from "react-router-dom";
import { WindowSize } from "../../../context/WindowContext";

export default function AddUser() {
  // use
  // for email error
  const [err, setErr] = useState("");
  // use nav
  const nav = useNavigate();
  // useState for name and email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  // useref to focus input
  const Focus = useRef(null);
  useEffect(() => {
    if (name.length === 0) {
      Focus.current.focus();
    }
  });
  //    submit function for save
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post("/dashboard/user/add", {
        name: name,
        email: email,
        password: password,
        role: role,
      }).then(() => nav("/dashboard/users"));
    } catch (err) {
      if (err.response.status === 500) {
        setErr("email is already been taken ");
      } else {
        setErr("internal server error");
      }
      console.log(err);
    }
  }
  const windowSize = useContext(WindowSize);
  const Size = windowSize.windowWidth;
  const classNames=
    Size < 500
      ? "bg-white w-100 p-3  mx-1    mt-5 "
      : "bg-white w-100  mx-5 p-5   mt-5 ";
  return (
    <>
      {/*  */}
      <Form className={classNames} onSubmit={handleSubmit}>
        {/* name */}
        <Form.Group>
          <Form.Label htmlFor="name" className="form-label">
            Name
          </Form.Label>
          <Form.Control
            ref={Focus}
            className="form-control"
            name="name"
            type="name"
            id="name"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
          />
        </Form.Group>
        {/* email */}
        <Form.Group>
          <Form.Label htmlFor="email" className="form-label">
            Email
          </Form.Label>
          <Form.Control
            className="form-control"
            name="email"
            type="email"
            id="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
        </Form.Group>
        {err ? <p className=" errMsg">{err}</p> : ""}

        {/* password */}
        <Form.Group>
          <Form.Label htmlFor="password" className="form-label">
            password
          </Form.Label>
          <Form.Control
            className="form-control"
            name="password"
            type="password"
            id="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
        </Form.Group>

        {/* role */}
        <Form.Group>
          <Form.Label htmlFor="Role" className="form-label">
            Role
          </Form.Label>
          <Form.Select
            id="Role"
            onChange={(event) => setRole(event.target.value)}
            value={role}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="1995">admin</option>
            <option value="1999">product manger</option>
            <option value="2001">user</option>
          </Form.Select>
        </Form.Group>

        <div style={{ textAlign: "center" }}>
          <button
            disabled={
              name.length < 1 ||
              email.length < 1 ||
              password.length < 1 ||
              role === ""
                ? true
                : false
            }
            className="btn btn-primary w-75 mt-4 "
            type="submit"
          >
            Save
          </button>
        </div>
      </Form>
    </>
  );
}
