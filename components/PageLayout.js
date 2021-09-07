import { childElements } from 'dom-helpers'
import { Navbar, Nav } from 'react-bootstrap'

const PageLayout = ({ children }) => {
  return (
    <div>
      <Navbar expand="lg">
        <Navbar.Brand href="/">Course Viewer</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>{children}</div>
    </div>
  )
}

export default PageLayout
