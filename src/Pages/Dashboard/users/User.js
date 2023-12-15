import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../Components/Global/Spinner";

export default function User() {
  // for email error
  const [err, setErr] = useState("");
  const [spinner, setSpinner] = useState(false);
  // disable data in useState
  const [disable, setDisable] = useState(true);
  // use nav
  const nav = useNavigate();
  // get id from href
  // let id = window.location.href;
  // id = id.split("/").slice(-1)[0];
  let { id } = useParams();

  // useState for name and email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  //    submit function for save
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`/dashboard/user/edit/${id}`, {
        name: name,
        email: email,
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

  //   get user by id
  useEffect(() => {
    setSpinner(true);
    Axios.get(`/dashboard/user/${id}`)
      .then((data) => {
        setSpinner(false);
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
      })
      .then(() => setDisable(false))
      .catch((err) => {
        console.log(err);
        nav("/*");
      });
  }, [id, nav]);
  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <Form
          className="bg-white w-100 mx-5 p-5  mt-5 "
          onSubmit={handleSubmit}
        >
          <Form.Group>
            <Form.Label htmlFor="name" className="form-label">
              Name
            </Form.Label>
            <Form.Control
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
          <Form.Group>
            <Form.Label htmlFor="email" className="form-label">
              Role
            </Form.Label>
            <Form.Select
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
          {err ? <p className=" errMsg">email already has been taken </p> : ""}

          <div style={{ textAlign: "center" }}>
            <button
              disabled={disable}
              className="btn btn-primary w-75 mt-4 "
              type="submit"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </>
  );
}
