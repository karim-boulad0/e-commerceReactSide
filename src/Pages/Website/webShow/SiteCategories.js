import React, { useState, useEffect } from "react";
import { Axios } from "../../../Api/Axios.js";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Spinner from "../../../Components/Global/Spinner.js";
import CustomPagination from "../../../Components/Global/CustomPagination.jsx";
// import "./css/SiteCategories.css"
export default function SiteCategories() {
  const [allCategories, setAllCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [isGet, setIsGet] = useState(false);
  // show
  const ShowCategories = allCategories.map((category) => (
    <Col lg={3} md={3} sm={4} xs={6} key={category.id}>
      <NavLink to={`/index/categoryProducts/${category.id}`}>
        <div className="card mb-4 shadow">
          <Link to={`/index/categoryProducts/${category.id}`}>
            <img
              src={category.image}
              alt={category.title}
              className="card-img-top img-fluid"
              style={{ height: "300px", objectFit: "cover" }}
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{category.title}</h5>
          </div>
        </div>
      </NavLink>
    </Col>
  ));
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25; // Set the number of items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = ShowCategories.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // pagination
  // get categories using filter
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/webSite/all?filter[item]=${query}`);
        setIsGet(true);
        setAllCategories(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [query]);

  if (!isGet) {
    return (
      <div style={{ height: "100vh" }}>
        <Spinner />
      </div>
    );
  }
  return (
    <Container>
      <h1>Categories</h1>
      <input
        type="text"
        className="form-control w-50 m-3"
        placeholder="Search categories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Row>{currentData}</Row>
      <CustomPagination
        data={allCategories}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </Container>
  );
}
