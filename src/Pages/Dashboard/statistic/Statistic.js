// Statistic.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Spinner from "../../../Components/Global/Spinner";

export default function Statistic() {
  const [selectedMonthWithYear, setSelectedMonthWithYear] = useState(
    new Date()
  );
  const [selectedStatus, setSelectedStatus] = useState("delivered");
  const [statistic, setStatistic] = useState([]);
  const [IsGet, setIsGet] = useState(false);
  const [productsAreAboutRunOut, setProductsAreAboutRunOut] = useState({});
  //   open close
  const [isCardOpen, setIsCardOpen] = useState(false);
  const handleAlertClick = () => {
    setIsCardOpen(!isCardOpen);
  };
  //   get order statistics
  useEffect(() => {
    Axios.get(
      `/dashboard/order/statistic/${selectedMonthWithYear.getDate()}/${
        selectedMonthWithYear.getMonth() + 1
      }/${selectedMonthWithYear.getFullYear()}/${selectedStatus}`
    )
      .then((response) => {
        setStatistic(response.data);
      })
      .catch((err) => console.log(err));
  }, [selectedMonthWithYear, selectedStatus]);
  // get products Are About Run Out
  useEffect(() => {
    Axios.get("dashboard/order/statistic/productsAreAboutRunOut")
      .then((response) => {
        setProductsAreAboutRunOut(response.data);
        setIsGet(true);
      })
      .catch((err) => console.log(err));
  }, [selectedStatus]);
  if (!IsGet) {
    return <Spinner />;
  }

    const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  return (
    <Container>
      {IsGet && (
        <>
          <h1 className="mt-4">Statistics</h1>
          {/* Month and Year Picker */} {/* status picker */}
          <Row className="mt-4">
            {/* Month and Year Picker */}
            <Col md={6}>
              <label className="mb-2 text-primary">
                Select Month and Year:
              </label>
              <div className="input-group">
                <DatePicker
                  selected={selectedMonthWithYear}
                  onChange={(date) => setSelectedMonthWithYear(date)}
                  dateFormat="MM/dd/yyyy"
                  showMonthYearPicker
                  className="form-control datepicker-input"
                />
              </div>
            </Col>
            {/* status picker */}
            <Col md={6}>
              <Form.Group controlId="formStatus">
                <Form.Label className="mb-2 text-primary">
                  Select Orders Status:
                </Form.Label>
                <Form.Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="delivered">delivered</option>
                  <option value="pending">pending</option>
                  <option value="confirmed">confirmed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {/* show statistic */}
          <Row className="mt-4">
            {/* daily sails  */}
            <Col md={4} className="bg-light">
              <Alert variant={"primary"} className="mt-1">
                Daily Statistics
              </Alert>
              <Card>
                <Card.Body>
                  <Card.Title>Daily Sales</Card.Title>
                  <p>
                    {selectedMonthWithYear?.getMonth() + 1} /
                    {selectedMonthWithYear?.getDate()} /
                    {selectedMonthWithYear?.getFullYear()}
                  </p>
                  <Card.Text>
                    total sales:
                    <span className="text-primary">
                    {formatCurrency(statistic?.YearlyMonthlyDailyOrders?.totalPrice)}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    Count orders:
                    <span className="text-primary">
                      {statistic?.YearlyMonthlyDailyOrders?.productCount}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* monthly sails */}
            <Col md={4} className="bg-light">
              <Alert variant={"primary"} className="mt-1">
                Monthly Statistics
              </Alert>
              <Card>
                <Card.Body>
                  <Card.Title>Monthly Sales</Card.Title>
                  <p>
                    {selectedMonthWithYear?.getMonth() + 1} /
                    {selectedMonthWithYear?.getFullYear()}
                  </p>
                  <Card.Text>
                    total sales:
                    <span className="text-primary">
                    {formatCurrency(statistic?.YearlyMonthlyOrders?.totalPrice)}
                    $

                    </span>
                  </Card.Text>
                  <Card.Text>
                    Count orders:
                    <span className="text-primary">
                      {statistic?.YearlyMonthlyOrders?.productCount}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* yearly sails */}
            <Col md={4} className="bg-light">
              <Alert variant={"primary"} className="mt-1">
                Yearly Statistics
              </Alert>
              <Card>
                <Card.Body>
                  <Card.Title>Yearly Sales</Card.Title>
                  <p>{selectedMonthWithYear.getFullYear()}</p>
                  <Card.Text>
                    total sales:
                    <span className="text-primary">
                      {formatCurrency(statistic?.YearlyOrders?.totalPrice)}
                      $
                    </span>
                  </Card.Text>
                  <Card.Text>
                    Count orders:
                    <span className="text-primary">
                      {statistic?.YearlyOrders?.productCount}{" "}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <hr></hr>
          <hr></hr>
          <Alert
            onClick={handleAlertClick}
            variant={"primary"}
            className="mt-3"
          >
            Low Quantity Products less than 50
          </Alert>
          <Row className="mt-3  ">
            {isCardOpen &&
              IsGet &&
              productsAreAboutRunOut.map((product, index) => (
                <Col key={index} md={4}>
                  <Link to={"/dashboard/products/" + product.id}>
                    <Card className="p-3">
                      <Card.Img
                        src={productsAreAboutRunOut[0]?.images[0]?.image}
                        alt={`Image for ${product?.title}`}
                      />

                      <Card.Text>
                        Title :{" "}
                        <span className="text-primary">{product?.title}</span>
                      </Card.Text>
                      <Card.Text>
                        Quantity :
                        <span className="text-primary">
                          {product?.quantity}
                        </span>{" "}
                      </Card.Text>
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>
        </>
      )}
    </Container>
  );
}
