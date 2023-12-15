import { useContext, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORIES } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { WindowSize } from "../../../context/WindowContext";
import { Spinner } from "react-bootstrap";

export default function Product() {
  const windowSize = useContext(WindowSize);
  const Size = windowSize.windowWidth;
  const [isSelect, setIsSelect] = useState(false);

  const classNames =
    Size < 500
      ? "bg-white w-100 p-3 mx-1    mt-5 "
      : "bg-white w-100  mx-5 p-5   mt-5 ";
  //   get id of product
  let { id } = useParams();
  // create nav
  const nav = useNavigate();

  let [reloadDelete, setReloadDelete] = useState(1);
  const progress = useRef([]);
  const OpenImage = useRef(null);
  const ids = useRef([]);
  const j = useRef(-1);

  // useState of get data of categories
  const [data, setData] = useState([]);
  const [indexDelete, setIndexDelete] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  //   images
  const [images, setImages] = useState([]);
  // setUp form data
  const [form, setForm] = useState({
    category_id: "select category",
    title: "",
    status: "select Status",
    description: "",
    price: "",
    About: "",
    discount: "",
    delivery_price: "",
    quantity: "",
  });

  // ----------------------------UseEffect----------------------------------

  //  get productImages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productImages = await Axios.get(`/dashboard/images/${id}`);
        setProductImages(productImages.data.data);
        setIsLoad(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [reloadDelete,id]);
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
  // handle form change
  function handleForFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/dashboard/product/${id}`);
        const productData = response.data; // Access the object inside the array
        setForm({
          category_id: productData.category_id,
          status: productData.status, // Set the status from the API response
          About: productData.About,
          description: productData.description,
          discount: productData.discount,
          price: productData.price,
          title: productData.title,
          delivery_price: productData.delivery_price,
          quantity: productData.quantity,
        });

        setIsSelect(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  // ----------------------------Functions----------------------------------

  // function for click to select images
  function HandleOpenInput() {
    OpenImage.current.click();
  }
  //   Handle submit function

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await Axios.post(`/dashboard/product/edit/${id}`, form).then(() =>
        nav("/dashboard/products")
      );
    } catch (err) {
      console.log(err);
    }
  }
  // function delete image
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
  // function delete image
  async function deleteImageExist(id, index) {
    try {
      setIndexDelete(index);
      setReloadDelete((prev) => prev + 1);
      await Axios.delete(`/dashboard/product-img/${id}`);
      setIsLoad(true);
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
        formData.append("product_id", id); // Append the product_id to the FormData object

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

  // -------------------------------Map---------------------------------------------
  //  Map  data of categories
  const CategoriesShow = data.map((item, index) => (
    <option key={index} value={item.id}>
      {item.title}
    </option>
  ));
  //  Map  data of product images
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
          <span
            className="btn btn-danger"
            onClick={() => deleteImage(index, item)}
          >
            delete
          </span>
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
  //  Map  data of product images
  const imagesOfProduct = productImages.map((item, index) => (
    <>
      <div
        key={index}
        className="d-flex align-items-center w-75 justify-content-start gap-2 rounded p-2"
        style={{ border: "solid 2px #eee" }}
      >
        <img
          key={index}
          src={item.image}
          className="w-25 h-25 my-3 rounded "
          style={{ border: "solid 2px white" }}
          alt="img"
        />
        <div></div>
        <div className="d-flex align-items-center w-75 justify-content-end">
          <span
            className="btn btn-danger"
            onClick={() => deleteImageExist(item.id, index)}
          >
            delete
          </span>
          {indexDelete === index && isLoad ? <Spinner /> : ""}
        </div>
      </div>
    </>
  ));
  // render data
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
            disabled={!isSelect}
            name="category_id"
            id="category_id"
            onChange={handleForFormChange}
            value={form.category_id}
          >
            <option disabled>select category</option>
            {CategoriesShow}
          </Form.Select>
        </Form.Group>
        {/* status */}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="status" className="form-label">
            status
          </Form.Label>
          <Form.Select
            disabled={!isSelect}
            name="status"
            id="status"
            onChange={handleForFormChange}
            value={form.status} // Check this value binding
          >
            <option disabled>Select status</option>
            <option value="rejected">Rejected</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
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
        {/* quantity*/}
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
        {/* handle image press */}
        <div
          disabled={!isSelect}
          onClick={HandleOpenInput}
          className=" m-4 d-flex align-items-center justify-content-center flex-column gap-2  rounded  "
          style={{
            border: "dotted blue",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            className="w-25 h-50 "
            icon={faCloudArrowUp}
            style={{ color: "gold" }}
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
        {imagesOfProduct}
      </form>
    </>
  );
}
