import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import './Settings.css';
import Spinner from "../../../Components/Global/Spinner.js";

export default function Settings({ updateSettings }) {
  const [settingData, setSettingData] = useState(null);
  const [icon, setIcon] = useState();
  const [logo, setLogo] = useState();
  const [action, setAction] = useState(0);
  const [formData, setFormData] = useState();
  const [isSuccessUpdate, setIsSuccessUpdate] = useState(false);

  useEffect(() => {
    Axios.get("/settings/index")
      .then((data) => {
        setSettingData(data.data);
        setFormData({
          title: data.data.title || "",
          site_name: data.data.site_name || "",
          icon: data.data.icon || "",
          logo: data.data.logo || "",
          phone_number: data.data.phone_number || "",
          email: data.data.email || "",
        });
      })
      .catch((err) => console.log(err));
  }, [action]);

  if (!settingData) {
    // Data is still loading, return a loading state or spinner
    return <Spinner/>;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSuccessUpdate(true);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("site_name", formData.site_name);
      formDataToSend.append("phone_number", formData.phone_number);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("icon", icon); // Append the file here
      formDataToSend.append("logo", logo); // Append the file here

      await Axios.post("/dashboard/settings/update", formDataToSend);
      updateSettings();
      setAction((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };
  return (
    <div className="mt-5 container">
      <h1>
        Settings{" "}
        {isSuccessUpdate ? (
          <p className="alert alert-primary">success update settings</p>
        ) : (
          ""
        )}
      </h1>
      <Form onSubmit={handleFormSubmit}>
        {/* Input fields for each setting */}
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Icon:</Form.Label>
          <Form.Control
            type="file"
            name="icon"
            id="icon"
            onChange={(event) => setIcon(event.target.files[0])}
          />
          {formData.icon && (
            <img
              src={settingData.icon}
              alt={`${settingData.icon}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>logo:</Form.Label>
          <Form.Control
            type="file"
            name="logo"
            id="logo"
            onChange={(event) => setLogo(event.target.files[0])}
          />
          {formData.logo && (
            <img
              src={settingData.logo}
              alt={`${settingData.logo}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Site Name:</Form.Label>
          <Form.Control
            type="text"
            name="site_name"
            value={formData.site_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" className="m-3" type="submit">
          Update Settings
        </Button>
      </Form>
    </div>
  );
}
