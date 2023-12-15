import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Components/Global/Spinner";
import { USER } from "../../../Api/Api";
import { useContext } from "react";
import { WindowSize } from "../../../context/WindowContext";

export default function UserProfile() {
  const [err, setErr] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [disable, setDisable] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    setSpinner(true);
    Axios.get(`/dashboard${USER}`)
      .then((data) => {
        setSpinner(false);
        setName(data.data.name);
        setEmail(data.data.email);
        setID(data.data.id);
      })
      .then(() => setDisable(false))
      .catch((err) => {
        console.log(err);
        nav("/*");
      });
  }, [nav]);
  //   --------------------------functions-------------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`/dashboard/user/edit/profile/${ID}`, {
        name: name,
        email: email,
      }).then(() => nav("/dashboard"));
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
      {spinner ? (
        <Spinner />
      ) : (
        <Form
          className={classNames}
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
