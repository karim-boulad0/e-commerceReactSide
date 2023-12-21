import React, { useState, useEffect } from "react";
import { Axios } from "../../../Api/Axios.js";
import { Col, Container, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
// import "./css/SiteCategories.css"
export default function SiteCategories() {
  const [allCategories, setAllCategories] = useState([]);
  const [query, setQuery] = useState(""); 

  // get categories using filter 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/webSite/all?filter[item]=${query}`);
        setAllCategories(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [query]);
  
  // show
  const ShowCategories = allCategories.map((category) => (
    <Col lg={3} md={3} sm={4} xs={12} key={category.id}>
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
      <Row>{ShowCategories}</Row>
    </Container>
  );
}
