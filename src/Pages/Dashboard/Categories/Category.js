import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { useNavigate, useParams } from "react-router-dom";

export default function CategorySite() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const nav = useNavigate();

  let { id } = useParams();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);


  //  get user by id
  useEffect(() => {
    Axios.get(`/dashboard/category/${id}`)
      .then((data) => {
        setTitle(data.data.title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  //    handleSubmit edit category
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post("/dashboard/category/edit/" + id, formData).then(() =>
        nav("/dashboard/categories")
      );
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Form className="bg-white w-100 mx-5 p-5  mt-5 " onSubmit={handleSubmit}>
        {/* title */}
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
            onChange={(event) => setImage(event.target.files[0])}
          />
        </Form.Group>

        <div style={{ textAlign: "center" }}>
          <button
            disabled={title.length < 1 ? true : false}
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
