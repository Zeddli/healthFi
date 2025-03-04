import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            HealthFI
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/consent">Consent Manager</Nav.Link>
            <Nav.Link as={Link} to="/identity">Digital Identity</Nav.Link>
            <Nav.Link as={Link} to="/health-records">Health Records</Nav.Link>
            <Nav.Link as={Link} to="/audit">Audit Trail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <main>{children}</main>
    </>
  );
}

export default Layout;
