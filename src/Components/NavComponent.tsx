import Navbar from "react-bootstrap/Navbar";
import SearchDetail from "./SearchDetail";
import OffCanvasComponent from "./OffCanvasComponent";
import { Button, Nav } from "react-bootstrap";
import { Icon } from "./Icon";
import { useState } from "react";
import ModalBasic from "./ModalBasic";
import { Link, useLocation } from "react-router-dom";
import img from "../assets/gene.png";

function NavComponent() {
    const location = useLocation();
    const [showOffCanva, setShowOffCanva] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const namePage: string = location.pathname;

    return (
        <Navbar className="d-flex" expand="lg" bg="dark" sticky="top">
            <OffCanvasComponent
                showOffCanva={showOffCanva}
                setShowOffCanva={setShowOffCanva}
            />
            <div className=" ps-2 pt-1 text-white d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center">
                    <Button
                        variant="light"
                        className="bg-light m-1"
                        onClick={() => setShowOffCanva(true)}
                    >
                        <Icon type={"burger"} />
                    </Button>
                    <Nav.Link className="text-white " as={Link} to="/">
                        <img
                            src={img}
                            width="30"
                            height="30"
                            className="d-inline-block mx-3"
                            alt="Logo"
                        />
                        {namePage}
                    </Nav.Link>
                </div>
                <div className="  pe-2 pt-1 d-flex">
                    <Button
                        variant="light"
                        className="bg-light m-1"
                        onClick={() => setModalShow(true)}
                    >
                        <Icon type={"search"} />
                    </Button>
                </div>
            </div>
            <ModalBasic
                modalShow={modalShow}
                setModalShow={setModalShow}
                size={"sm"}
                title={"Search by alias"}
            >
                <SearchDetail setModalShow={setModalShow} />
            </ModalBasic>
        </Navbar>
    );
}

export default NavComponent;
