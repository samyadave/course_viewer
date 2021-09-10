import { Navbar, Nav, Container } from 'react-bootstrap'

const PageLayout = ({ children }) => {
  return (
    <>
      <div className="page-header">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="/">Course Viewer</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="page-body">{children}</div>
      <div className="page-footer">Course-Viewer</div>
    </>
  )
}

export default PageLayout
