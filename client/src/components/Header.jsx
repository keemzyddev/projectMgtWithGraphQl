import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar
      className="p-3"
      expanded={expanded}
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand className="fs-2">
          <Link to="/" className="nav-link">
            PROJECT MGMT
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse className="collapse navbar-collapse" id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0 me-5 fs-3" navbarScroll>
            <Link
              to="/"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Home
            </Link>
            <Link
              to="/project"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Project
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
