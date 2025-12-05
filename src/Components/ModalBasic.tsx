import type { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
    size: "sm" | "lg" | "xl" | undefined;
    title: string;
};

function ModalBasic({ modalShow, setModalShow, size, title, children }: Props) {
    return (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size={size}
            contentClassName="p-3 text-small"
        >
            <Modal.Header closeButton onClick={() => setModalShow(false)}>
                {title}
            </Modal.Header>
            <Modal.Body
                className="mx-3 small"
                style={{
                    maxHeight: "65vh",
                    overflowY: "auto",
                }}
            >
                {children}
            </Modal.Body>
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
    );
}

export default ModalBasic;
