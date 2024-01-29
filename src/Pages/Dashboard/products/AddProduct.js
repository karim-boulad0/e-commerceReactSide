import { useContext, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { WindowSize } from "../../../context/WindowContext";

export default function AddProduct() {
  const progress = useRef([]);
  // for image button
  const OpenImage = useRef(null);
  // handleDeleteImage
  let ids = useRef([]);
  const j = useRef(-1);
  // id of category who created when i select category
  const [ProductId, setProductId] = useState("");
  // use state to change value of it when user choices category
  const [isSelect, setIsSelect] = useState(false);
  // useState of get data of categories
  const [data, setData] = useState([]);
  //   images
  const [images, setImages] = useState([]);
  // create nav
  const nav = useNavigate();
  // setUp form data
  const [form, setForm] = useState({
    category_id: "select category",
    title: "",
    description: "",
    price: "",
    About: "",
    discount: "",
    delivery_price: "",
    quantity: "",
  });
  // damyData
  const damyData = {
    category_id: "",
    title: "sa",
    description: "sa",
    price: "1",
    About: "ds",
    discount: "1",
    delivery_price: "0.00",
    quantity: "0.00",
  };
  const windowSize = useContext(WindowSize);
  const Size = windowSize.windowWidth;
  const classNames =
    Size < 500
      ? "bg-white w-100 p-3 mx-1    mt-5 "
      : "bg-white w-100  mx-5 p-5   mt-5 ";

  // ----------------------------useEffect----------------------------------
  //  get data of categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainData = await Axios.get("/dashboard" + CATEGORIES);
        setData(mainData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // ----------------------------Functions----------------------------------
  // function for click to select images
  function HandleOpenInput() {
    OpenImage.current.click();
  }
  //   Handle submit function when i choice category
  async function BeforeHandleSubmit() {
    try {
      await Axios.post("/dashboard/product/add", damyData).then((data) =>
        setProductId(data.data.id)
      );
    } catch (err) {
      console.log(err);
    }
  }
  // handle form change
  function handleForFormChange(e) {
    //  the first time when change category the first of isSelect is false so just first time it starts this function
    if (isSelect !== true) {
      BeforeHandleSubmit();
    }
    setIsSelect(true);
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //   Handle submit function
  async function handleEdit(e) {
    e.preventDefault();
    try {
      await Axios.post(`/dashboard/product/edit/${ProductId}`, form).then(() =>
        nav("/dashboard/products")
      );
    } catch (err) {
      console.log(err);
    }
  }
  // handle delete images
  async function deleteImage(id, item) {
    const findId = ids.current[id];
    try {
      await Axios.delete(`/dashboard/product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== item));
      ids.current = ids.current.filter((i) => i !== findId);
      j.current--;
    } catch (err) {
      console.log(err);
    }
  }
  // function handle image change
  async function handleImagesChange(e) {
    try {
      const formData = new FormData(); // Create a new FormData object
      setImages((prev) => [...prev, ...e.target.files]);
      const imagesAsFiles = e.target.files;
      for (let i = 0; i < imagesAsFiles.length; i++) {
        // Use < instead of <= for the loop condition
        j.current++;
        formData.append("image", imagesAsFiles[i]); // Append each image to the FormData object
        formData.append("product_id", ProductId); // Append the product_id to the FormData object

        try {
          const res = await Axios.post(`/dashboard/product-img/add`, formData, {
            onUploadProgress: (ProgressEvent) => {
              const { loaded } = ProgressEvent;
              const { total } = ProgressEvent;
              const percent = Math.floor((loaded * 100) / total);
              if (percent % 10 === 0) {
                progress.current[j.current].style.width = `${percent}%`;
                progress.current[j.current].setAttribute(
                  "percent",
                  `${percent}%`
                );
              }
            },
          }); // Wait for the Axios request to complete
          ids.current[j.current] = res.data.id;
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  // -------------------------------Maping---------------------------------------------
  //  Maping  data of categories
  const CategoriesShow = data.map((item, index) => (
    <option key={index} value={item.id}>
      {item.title}
    </option>
  ));
  //  Maping  data of product images
  const imagesShow = images.map((item, index) => (
    <>
      <div
        key={index}
        className="d-flex align-items-center w-75 justify-content-start gap-2 rounded p-2"
        style={{ border: "solid 2px #eee" }}
      >
        <img
          key={index}
          src={URL.createObjectURL(item)}
          className="w-25 h-25 my-3 rounded "
          style={{ border: "solid 2px white" }}
          alt="img"
        />
        <div>
          <p>{item.name}</p>

          <p>
            {item.size / 1024 < 999
              ? (item.size / 1024).toFixed(2) + " KB"
              : (item.size / (1024 * 1024)).toFixed(2) + " MB"}
          </p>
        </div>
        <div className="d-flex align-items-center w-75 justify-content-end">
          <button
            className="btn btn-danger"
            onClick={() => deleteImage(index, item)}
          >
            delete
          </button>
        </div>
      </div>
      <div className="custom-progress mt-3 w-75 mb-5">
        <span
          ref={(e) => (progress.current[index] = e)}
          // percent={` ${progress[index]}%`} style={{width:` ${progress[index]}%`}}
          className="inner-progress"
        ></span>
      </div>
    </>
  ));
  return (
    <>
      <form onSubmit={handleEdit} className={classNames}>
        {/* category */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="category_id" className="form-label">
            category
          </Form.Label>
          <Form.Select
            // ref={Focus}
            name="category_id"
            id="category_id"
            onChange={handleForFormChange}
            value={form.category_id}
          >
            <option disabled>select category</option>
            {CategoriesShow}
          </Form.Select>
        </Form.Group>

        {/* title */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="title" className="form-label">
            title
          </Form.Label>
          <Form.Control
            disabled={!isSelect}
            name="title"
            type="text"
            id="title"
            placeholder="name@example.com"
            onChange={handleForFormChange}
            value={form.title}
          />
        </Form.Group>
        {/* description */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="description" className="form-label">
            description
          </Form.Label>
          <Form.Control
            disabled={!isSelect}
            name="description"
            type="text"
            id="description"
            placeholder="description"
            onChange={handleForFormChange}
            value={form.description}
          />
        </Form.Group>
        {/* quantity */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="quantity" className="form-label">
            quantity
          </Form.Label>
          <Form.Control
            disabled={!isSelect}
            name="quantity"
            type="text"
            id="quantity"
            placeholder="quantity"
            onChange={handleForFormChange}
            value={form.quantity}
          />
        </Form.Group>
        {/* delivery_price */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="delivery_price" className="form-label">
            delivery_price
          </Form.Label>
          <Form.Control
            disabled={!isSelect}
            name="delivery_price"
            type="text"
            id="delivery_price"
            placeholder="delivery_price"
            onChange={handleForFormChange}
            value={form.delivery_price}
          />
        </Form.Group>
        {/* price*/}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="price" className="form-label">
            price
          </Form.Label>
          <Form.Control
            disabled={!isSelect}
            name="price"
            type="text"
            id="price"
            placeholder="price"
            onChange={handleForFormChange}
            value={form.price}
          />
        </Form.Group>
        {/* About*/}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="About" className="form-label">
            About
          </Form.Label>
          <Form.Control
            disabled={!isSelect}
            name="About"
            type="text"
            id="About"
            placeholder="About"
            onChange={handleForFormChange}
            value={form.About}
          />
        </Form.Group>

        {/* discount*/}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="discount" className="form-label">
            discount
          </Form.Label>
          <Form.Control
            disabled={!isSelect}
            name="discount"
            type="text"
            id="discount"
            placeholder="discount"
            onChange={handleForFormChange}
            value={form.discount}
          />
        </Form.Group>
        {/* images*/}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="images">images</Form.Label>
          <Form.Control
            disabled={!isSelect}
            hidden
            ref={OpenImage}
            type="file"
            multiple
            id="images"
            onChange={handleImagesChange}
          />
        </Form.Group>
        <div
          onClick={HandleOpenInput}
          className=" m-4 d-flex align-items-center justify-content-center flex-column gap-2  rounded  "
          style={{
            border: isSelect ? "dotted blue" : "dotted black",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            className="w-25 h-50 "
            icon={faCloudArrowUp}
            style={{ color: isSelect ? "gold" : "black" }}
          />
          <h6>Upload Images</h6>
        </div>
        {/* images */}
        {imagesShow}
        {/* button */}
        <div style={{ textAlign: "center" }}>
          <button className="btn btn-primary w-100 " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
