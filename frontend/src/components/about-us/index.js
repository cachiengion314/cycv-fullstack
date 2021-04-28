import React from 'react'
import "./index.css"
import image from './image/cv-image.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

const index = () => {
    return (
        <div className="Navbar">
            <Navbar collapseOnSelect expand="lg" bg="ligh" variant="ligh" className="margin">
                <Navbar.Brand href="#home">Mindx Create your CV</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="My CV" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#About US">About US</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                    <Nav className="in-up">
                        <Nav.Link href="#deets">Sign in</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">Sign up</Nav.Link>
                        <Nav.Link href="#Contact US">Contact US</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container">

                <div>
                    <p>Hãy cho tôi cả thế giới tôi sẽ làm nên tất cả</p>
                </div>
                <div>
                    <img src={image} className="image"></img>
                </div>
                <div>
                    <p>Tôi có thể cân cả thế giới</p>
                </div>
            </div>
        </div>

    )
}

export default index