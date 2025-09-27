import type { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
};

function ModalSearch({ modalShow, setModalShow, children }: Props) {
    return (
        <>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="sm"
                contentClassName="p-3 font-monospace text-small"
            >
                <Modal.Header closeButton onClick={() => setModalShow(false)}>
                    Search Detail
                </Modal.Header>
                <Modal.Body className="mx-3 small">{children}</Modal.Body>
                <Modal.Footer>
                    <Button
                        className="font-base"
                        variant={"dark"}
                        onClick={() => setModalShow(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalSearch;
