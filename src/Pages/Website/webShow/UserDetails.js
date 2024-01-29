import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Axios } from "../../../Api/Axios";
import Spinner from "../../../Components/Global/Spinner";

export default function UserDetails() {
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    birthDate: "",
    gender: "",
  });

  // get user details if exist
  useEffect(() => {
    Axios.get("/webSite/showUserDetails")
      .then((data) => {
        setForm({
          first_name: data.data.first_name || "",
          last_name: data.data.last_name || "",
          address: data.data.address || "",
          phone_number: data.data.phone_number || "",
          birthDate: data.data.birthDate || "",
          gender: data.data.gender || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  // handle change data
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // handle submit edit user details
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/webSite/storeDetails", form)
      .then(() => {
        setDone(true);
        window.history.back()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (<div style={{ height: '100vh' }}><Spinner /></div>)

  }

  return (
    <>
      <div
        className="container bg-light"
        style={{ marginTop: "80px", marginBottom: "80px" }}
      >
        <h1>User Details</h1>
        {done ? <h2 className="alert alert-primary"> update success</h2> : ""}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={form.address}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={form.phone_number}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBirthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={form.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </div>
    </>
  );
}
