import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../Api/Axios";
import './Test.css';

export default function Test() {
  const [categories, setCategories] = useState([]);
  const [isGet, setIsGet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/webSite/categoriesWithProducts");
        setCategories(response.data);
        setIsGet(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const showCategories = categories.map((category, index) => (
    <NavDropdown.Item key={index} className="category-item">
      <Link to={`/index/categoryProducts/${category.id}`} className="category-link">
        {category.title}
      </Link>
    </NavDropdown.Item>
  ));

  return (
    <>
      {isGet && (
        <NavDropdown
          title="Categories"
          className="w-100 mt-2"
          id="basic-nav-dropdown"
        >
          <div className="categories-container">{showCategories}</div>
          <Link to={"/index/categories"} className="see-all-link">
            See All
          </Link>
        </NavDropdown>
      )}
    </>
  );
}
