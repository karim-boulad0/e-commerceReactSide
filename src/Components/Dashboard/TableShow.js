import React, { useState } from "react";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomPagination from "../Global/CustomPagination";

export default function TableShow(props) {
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
        <h3>no {props.title} found</h3>
      </td>
    </tr>
  );
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = props.data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // pagination

  // make head of table
  const headerShow = props.header.map((item, index) => (
    <th key={index}>{item.name}</th>
  ));

  return (
    <div className="container pt-4">
      <div className="d-flex align-items-center justify-content-between">
        <h1>{props.title}</h1>
        {props.isNotAddNew ? (
          ""
        ) : (
          <Link to={props.addNew} className="btn btn-primary ">
            Add New
          </Link>
        )}
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
          {currentData.length === 0 && !props.isGet
            ? tr
            : currentData.length === 0 && props.isGet
            ? trTwo
            : currentData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  {props.header.map((item2, index) => {
                    const i = item2.key;
                    return (
                      <td key={index}>
                        {item[i] === "1995" ? (
                          "admin"
                        ) : item[i] === "1996" ? (
                          "writer"
                        ) : item[i] === "2001" ? (
                          "user"
                        ) : item[i] === "1999" ? (
                          "product"
                        ) : item[i] === props.CurrentUser.name ? (
                          item[i] + "( you )"
                        ) : item[i].includes("http://") ? (
                          <img
                            style={{ width: "60px", height: "60px" }}
                            src={item[i]}
                            alt="no"
                          ></img>
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
                    {props.CurrentUser.id !== item.id ? (
                      <FontAwesomeIcon
                        cursor="pointer"
                        onClick={() => props.HandleDelete(item.id)}
                        className="text-danger "
                        icon={faTrashCan}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      <CustomPagination
        data={props.data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
