import { useState, type ReactNode } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

type Props = {
    children: ReactNode;
};

function CanvasComponent({ children }: Props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img
                            src={"../../public/gene.png"}
                            width="30"
                            height="30"
                            className="d-inline-block mx-3"
                            alt="Logo"
                        />
                        v i t a m i n a
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body className="d-flex flex-column">
                    {children}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default CanvasComponent;
