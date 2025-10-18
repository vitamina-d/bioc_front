import type { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
};

function ModalResultBlastx({ modalShow, setModalShow, children }: Props) {
    return (
        <>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="xl"
                contentClassName="p-3 text-small"
            >
                <Modal.Header closeButton onClick={() => setModalShow(false)}>
                    Result blastx
                </Modal.Header>
                <Modal.Body className="mx-3 small">{children}</Modal.Body>
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

export default ModalResultBlastx;
