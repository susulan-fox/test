import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar
      className="py-3 fixed-top shadow-sm"
      bg="primary"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="50"
            height="40"
            className="d-inline-block align-top me-2"
            alt="Enigma Laundry Logo"
          />{" "}
          Enigma Laundry
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center" id="navmenu">
            <Nav.Link href="#services" className="text-light mx-2">
              Services
            </Nav.Link>
            <Nav.Link href="#promo" className="text-light mx-2">
              Promo
            </Nav.Link>
            <Nav.Link href="#contact" className="text-light mx-2">
              Contact Us
            </Nav.Link>
            <Link to="/login">
                <button className="btn btn-primary btn-lg border text-light">
                  Login
                </button>
              </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
