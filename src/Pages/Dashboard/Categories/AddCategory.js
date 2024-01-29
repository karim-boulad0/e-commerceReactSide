import { useContext, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { useNavigate } from "react-router-dom";
import { WindowSize } from "../../../context/WindowContext";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const Focus = useRef(null);
  const nav = useNavigate();
  const windowSize = useContext(WindowSize);
  const Size = windowSize.windowWidth;

  const classNames =
    Size < 500
      ? "bg-white w-100 p-3 mx-1   mt-5 "
      : "bg-white w-100  mx-5 p-5   mt-5 ";

  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);
  // handle focus
  useEffect(() => {
    Focus.current.focus();
  }, []);

  // handle create new category
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post("/dashboard/category/add", formData).then(() =>
        nav("/dashboard/categories")
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Form className={classNames} onSubmit={handleSubmit}>
        {/* title */}
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
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            required
          />
        </Form.Group>
        {/* image */}
        <Form.Group>
          <Form.Label htmlFor="image">Image</Form.Label>
          <Form.Control
            type="file"
            id="image"
            name="image"
            required
            onChange={(event) => setImage(event.target.files[0])}
          />
        </Form.Group>

        <div style={{ textAlign: "center" }}>
          <button
            disabled={title.length < 1 || image.length < 1 ? true : false}
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
