import Navbar from "react-bootstrap/Navbar";
import SearchDetail from "./SearchDetail";
import OffCanvasComponent from "./OffCanvasComponent";
import { Button, Nav } from "react-bootstrap";
import { Icon } from "./Icon";
import { useState } from "react";
import ModalSearch from "./ModalSearch";
import { Link, useLocation } from "react-router-dom";

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
                            src={"../../public/gene.png"}
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
            <ModalSearch modalShow={modalShow} setModalShow={setModalShow}>
                <SearchDetail setModalShow={setModalShow} />
            </ModalSearch>
        </Navbar>
    );
}

export default NavComponent;
