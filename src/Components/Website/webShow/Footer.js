import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { useNavigate } from "react-router-dom";
import './css/Footer.css';
export default function Footer() {
  const [msg, setMsg] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [isGet, setIsGet] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [settings, setSettings] = useState();
  const nav = useNavigate();

  // is auth
  useEffect(() => {
    Axios.get("/webSite/isAuthExist")
      .then((data) => setIsAuth(data))
      .catch((err) => console.log(err));
  }, []);

  // get settings
  useEffect(() => {
    Axios.get("/settings/index")
      .then((data) => {
        setSettings(data.data);
        setIsGet(true);
      })
      .catch((err) => console.log(err));
  }, []);

  // send message contact us
  function contactUs() {
    setIsClick(true);
    msg.length > 5
      ? isAuth
        ? Axios.post("/webSite/contactUs", { message: msg }).catch((err) => {
            console.log(err);
          })
        : nav("/login")
      : console.log();
  }

  return (
    <Container id="down">
      <Row>
        <Col md={12} className="text-center">
          <h5>Contact Us</h5>
          <p>Email: {isGet && settings.email}</p>
          <p>Phone: (+961) {isGet && settings.phone_number}</p>
        </Col>
      </Row>
      <hr />
      <Form className="bg-dark">
        <Row id="down">
          <Col md={2}></Col>
          <Col md={2}>
            <Button variant="primary" onClick={contactUs} className="contact-btn">
              Contact Us
            </Button>
          </Col>
          <Col md={7} className="form-msg">
            <Form.Group controlId="formMsg">
              <Form.Control
                type="text"
                placeholder="Type your message here..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              {msg.length < 5 && isClick ? (
                <p className="alert alert-danger mt-2">
                  Cannot be empty and must be at least 5 characters
                </p>
              ) : (
                ''
              )}
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <hr />
      <p className="text-center footer">
        © {isGet && settings.site_name}
      </p>
    </Container>
  );
}
