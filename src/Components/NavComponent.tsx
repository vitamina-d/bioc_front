import Navbar from "react-bootstrap/Navbar";
import SearchDetail from "./SearchDetail";
import OffCanvasComponent from "./OffCanvasComponent";
import { Button, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Icon } from "./Icon";
import { useState } from "react";
import ModalBasic from "./ModalBasic";
import { Link, useLocation } from "react-router-dom";
import img from "../assets/gene.png";
import ConfigAPIKey from "./ConfigAPIKey";

function NavComponent() {
    const location = useLocation();
    const [showOffCanva, setShowOffCanva] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalConfigShow, setModalConfigShow] = useState(false);
    const namePage: string = location.pathname;

    return (
        <Navbar className="d-flex" expand="lg" bg="dark" sticky="top">
            <OffCanvasComponent
                showOffCanva={showOffCanva}
                setShowOffCanva={setShowOffCanva}
            />
            <div className=" ps-2 pt-1 d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center">
                    <Button
                        variant="light"
                        className="bg-light m-1"
                        onClick={() => setShowOffCanva(true)}
                    >
                        <Icon type={"burger"} />
                    </Button>
                    <Nav.Link className="text-light " as={Link} to="/">
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
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Search</Tooltip>}
                    >
                        <Button
                            variant="light"
                            className="bg-light m-1"
                            onClick={() => setModalShow(true)}
                        >
                            <Icon type={"search"} />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Configuration</Tooltip>}
                    >
                        <Button
                            variant="secondary"
                            className="bg-secondary m-1"
                            onClick={() => setModalConfigShow(true)}
                        >
                            <Icon type={"config"} />
                        </Button>
                    </OverlayTrigger>
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
            {/* CONFIG APIKEY */}
            <ModalBasic
                modalShow={modalConfigShow}
                setModalShow={setModalConfigShow}
                size={"lg"}
                title={"Configuration"}
            >
                <ConfigAPIKey setModalShow={setModalConfigShow} />
            </ModalBasic>
        </Navbar>
    );
}

export default NavComponent;
