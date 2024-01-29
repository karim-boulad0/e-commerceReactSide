import { useEffect, useState } from "react";
import { PRODUCT } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Table, Pagination } from "react-bootstrap";
import CustomPagination from "../../../Components/Global/CustomPagination";

export default function Products() {
  const [data, setData] = useState([]);
  // is start getting data
  const [isGet, setIsGet] = useState(false);
  //   function of delete
  const [isDelete, setIsDelete] = useState(0);
  // header of components
  const Header = [
    {
      key: "title",
      name: "title",
    },
    {
      key: "category",
      name: "category",
    },
    // {
    //   key: "description",
    //   name: "description",
    // },
    {
      key: "rating",
      name: "rating",
    },
    {
      key: "ratings_number",
      name: "ratings_number",
    },
    {
      key: "status",
      name: "status",
    },

    {
      key: "price",
      name: "price",
    },
    {
      key: "discount",
      name: "discount",
    },
    {
      key: "delivery_price",
      name: "delivery_price",
    },
    // {
    //   key: "About",
    //   name: "About",
    // },
    {
      key: "image",
      name: "image",
    },
    {
      key: "quantity",
      name: "quantity",
    },
  ];
  // pagination handle
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // pagination handle

  // query
  const [query, setQuery] = useState("");
  // isFirstTime

  // make tr in variable
  const tr = (
    <tr className="text-center">
      <td colSpan={12}>
        <h3>loading...</h3>
      </td>
    </tr>
  );
  // make tr in variable
  const trTwo = (
    <tr className="text-center">
      <td colSpan={12}>
        <h3>no poducts found</h3>
      </td>
    </tr>
  );
  // make head of table

  //  --------------------- maps ------------------------
  const headerShow = Header.map((item, index) => (
    <th key={index}>{item.name}</th>
  ));
  // make body of table
  const Data = currentData.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      {Header.map((item2, index) => {
        const i = item2.key;
        return (
          <td key={index}>
            {item2.key === "category" ? (
              item[i]?.title
            ) : item2.key === "image" ? (
              <img
                src={item[i]}
                alt={item[i]}
                style={{ width: "60px", height: "60px" }}
              />
            ) : (
              item[i]
            )}
          </td>
        );
      })}
      {/* delete and edit of table */}
      <td className="d-flex align-items-center justify-content-around">
        <Link to={`${item.id}`}>
          <FontAwesomeIcon icon={faEdit} className="text-primary" />
        </Link>
        <FontAwesomeIcon
          cursor="pointer"
          onClick={() => HandleDelete(item.id)}
          className="text-danger "
          icon={faTrashCan}
        />
      </td>
    </tr>
  ));
  //  --------------------- useEffects ------------------------

  useEffect(() => {
    Axios.get(`/dashboard/filterProducts?filter[item]=${query}`)
      .then((data) => {
        setData(data.data.products);
        setIsGet(true);
      })
      .catch((err) => console.log(err));
  }, [isDelete, query]);

  //  --------------------- functions ------------------------
  // function of delete user by id
  async function HandleDelete(id) {
    try {
      await Axios.delete("/dashboard" + PRODUCT + "/" + id).then(() => {
        setIsDelete((prev) => prev + 1);
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="container pt-4">
      <div className="container mt-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products</h1>
        <Link to={"/dashboard/product/add"} className="btn btn-primary ">
          Add New
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {headerShow}
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {Data.length === 0 && !isGet
            ? tr
            : Data.length === 0 && isGet
            ? trTwo
            : Data}
        </tbody>
      </Table>
      {/* <Pagination>
        {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
          (number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          )
        )}
      </Pagination> */}
      <CustomPagination
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
