import React from 'react'
import { Container, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="mr-auto">
          <img alt=""
            src="https://logosandtypes.com/wp-content/uploads/2020/10/Figma.png"
            width="50" height="50" className="d-inline-block align-top" />
        </Navbar.Brand>
        {/* <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav> */}
      </Container>
    </Navbar>
  )
}

export default Header