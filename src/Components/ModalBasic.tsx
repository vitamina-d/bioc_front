import type { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

interface ModalProps {
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    child: ReactNode;
}

function ModalBasic({
    modalShow,
    setModalShow,
    child
}: ModalProps) {
    return (
        <>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                contentClassName="p-3 font-monospace text-muted text-small"
            >
                <Modal.Header closeButton onClick={() => setModalShow(false)}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <img
                            src="/public/chromosome.png"
                            alt="icono"
                            className="me-2 rounded-circle"
                            style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                            }}
                        />{" "}
                        TITLE
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-3 small">{child}</Modal.Body>
                <Modal.Footer>
                    <Button
                        className="font-base"
                        variant={"secondary"}
                        onClick={() => setModalShow(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalBasic;
