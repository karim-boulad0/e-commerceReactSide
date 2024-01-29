import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  return (
    <>
      <Container
        style={{ marginTop: "80px", marginBottom: "80px", color: "#333" }}
      >
        <h1 style={{ color: "#007BFF", marginBottom: "20px" }}>
          About Our E-Commerce Store
        </h1>
        <p>
          Welcome to our online marketplace! We strive to provide a wide range
          of products to meet your needs. Our goal is to make your shopping
          experience enjoyable and convenient.
        </p>

        <hr style={{ borderTop: "2px solid #007BFF", margin: "40px 0" }} />

        <h2 style={{ color: "#007BFF", marginBottom: "20px" }}>Our Mission</h2>
        <p>
          At karimShop, we are dedicated to offering high-quality products and
          excellent customer service. We aim to create a seamless online
          shopping experience for our customers.
        </p>

        <hr style={{ borderTop: "2px solid #007BFF", margin: "40px 0" }} />

        <h2 style={{ color: "#007BFF", marginBottom: "20px" }}>
          What We Offer
        </h2>
        <Row style={{}}>
          <Col md={4}>
            <Card
              className="mb-4"
              style={{
                border: "none",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                height: "300px",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#007BFF" }}>
                  Product Categories
                </Card.Title>
                <Card.Text>
                  Explore a variety of categories, from electronics to fashion,
                  and find the products you love.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="mb-4"
              style={{
                border: "none",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                height: "300px",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#007BFF" }}>
                  Quality Assurance
                </Card.Title>
                <Card.Text>
                  We ensure that our products meet high-quality standards to
                  provide you with a satisfying shopping experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="mb-4"
              style={{
                border: "none",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                height: "300px",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#007BFF" }}>
                  Customer Support
                </Card.Title>
                <Card.Text>
                  Our customer support team is here to assist you with any
                  inquiries or issues you may have.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <hr style={{ borderTop: "2px solid #007BFF", margin: "40px 0" }} />
      </Container>
    </>
  );
}
