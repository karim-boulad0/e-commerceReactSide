import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Button, Container, Modal, Table, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Orders() {
  const [data, setData] = useState();
  const [isGet, setIsGet] = useState(false);
  const Header = [
    {
      key: "name",
      name: "name",
    },
    {
      key: "address",
      name: "address",
    },


    {
      key: "status",
      name: "status",
    },

    {
      key: "phone_number",
      name: "phone_number",
    },
    {
      key: "note",
      name: "note",
    },
    {
      key: "totalPrice",
      name: "totalPrice",
    },
    {
      key: "countOrderItems",
      name: "countOrderItems",
    },
    {
      key: "countProducts",
      name: "countProducts",
    },
  ];
  const [isDelete, setIsDelete] = useState(0);
  const [query, setQuery] = useState("");
  const [id, setId] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  if (isGet) {
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // pagination
  function handleDeleteOpen(id) {
    setShowDeleteConfirmation(true);
    setId(id);
  }
  function handleDeleteClose() {
    setShowDeleteConfirmation(false);
    setId(id);
  }

  //   delete order
  async function deleteOrder() {
    try {
      await Axios.delete(`/dashboard/orders/delete/${id}`);
      setIsDelete((prev) => prev + 1);
      setShowDeleteConfirmation(false);
    } catch (err) {
      console.log(err);
    }
  }
  //   get orders
  useEffect(() => {
    Axios.get(`/dashboard/orders/index?filter[item]=${query}`)
      .then((response) => {
        const dataArray = Object.values(response.data);
        setData(dataArray); setIsGet(true);
      })
      .catch((err) => console.log(err));
  }, [query, isDelete]);
  //   map
  const showTableBody =
    isGet &&
    data.map((item, index) => (
      <tr key={index}>
        <td>{index}</td>
        {Header.map((itemHeader, headerIndex) => (
          <td key={headerIndex}>{item[itemHeader.key]}</td>
        ))}
        <td className="d-flex justify-content-between align-items-center">
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDeleteOpen(item.id)}
            className=" text-danger"
            cursor={"pointer"}
          />
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              icon={faEdit}
              className=" text-primary"
              cursor={"pointer"}
            />
          </Link>
        </td>
      </tr>
    ));
  const headerShow = Header.map((item, index) => (
    <th key={index}>{item.name}</th>
  ));
  const showDeleteModal = (
    <Modal show={showDeleteConfirmation} onHide={handleDeleteClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this order?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeleteClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={deleteOrder}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
  return (
    <Container className="mt-5">
      <h1>Orders</h1>
      <div className="mb-2 mt-2">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {headerShow}
            <th>action</th>
          </tr>
        </thead>
        <tbody>{showTableBody}</tbody>
      </Table>
      {showDeleteModal}
      {isGet && (<Pagination>
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
      </Pagination>)}

    </Container>
  );
}
