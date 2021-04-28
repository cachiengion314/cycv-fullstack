import React from "react";
import "./index.css";
import image from "./image/cv-image.png";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Nav,
    Navbar,
    NavDropdown,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";

const index = () => {
    return (
        <div className="Navbar">
            <Navbar
                collapseOnSelect
                expand="lg"
                bg="dark"
                variant="dark"
            >
                <Navbar.Brand href="#home">Mindx Create your CV</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="My CV" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
              </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
              </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#About US">About US</Nav.Link>
                    </Nav>
                    <Form className="sreach">
                        <FormControl type="text" placeholder="Search" className="md-xs" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                    <Nav className="in-up">
                        <Nav.Link href="#deets">Sign in</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Sign up
            </Nav.Link>
                        <Nav.Link href="#Contact US">Contact US</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container">
                <div>
                    <p>
                        Trước sự phát triển vượt bậc của nền kinh tế, rất nhiều ngành nghề
                        trở nên khan hiếm nhân lực hoặc thiếu nhân lực giỏi. Tại Việt Nam,
                        rất nhiều doanh nghiệp có nhu cầu tuyển dụng nhân sự với mức lương
                        hấp dẫn. Một công việc ưng ý thì không thể thiếu 1 mẫu CV bắt mắt
                        đúng không nào Mindx Create your CV mang đến cho các bạn rất nhiều
                        sự lựa cho các mẫu CV đẹp và bắt mắt.
          </p>
                </div>
                <div>
                    <img src={image} className="image"></img>
                </div>
                <div>
                    <p>
                        Tại Mindx Create your CV, bạn có thể tìm thấy những mẫu CV cực kỳ
                        bắt mắt và chuyên dụng với những ngành nghề khác nhau. Mindx Create
                        your CV là nền tảng tuyển dụng công nghệ cao giúp các nhà tuyển dụng
                        và ứng viên kết nối với nhau. Nhanh tay tạo CV để ứng tuyển vào các
                        vị trí việc làm hấp dẫn tại việc làm mới nhất tại các tỉnh thành
                        trên cả nước, bạn sẽ tìm thấy những việc làm ưng ý với mức lương tốt
                        nhất!
          </p>
                </div>
            </div>
        </div>
    );
};

export default index;
