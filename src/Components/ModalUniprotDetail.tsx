import { Card } from "react-bootstrap";
import ModalBasic from "./ModalBasic";
import type React from "react";
import ModalBodyUniprot from "./ModalBodyUniprot";

type Props = {
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    estructure: string;
    uniprotId: string;
};

function ModalUniprotDetail({
    modalShow,
    setModalShow,
    estructure,
    uniprotId,
}: Props) {

    return (
        <ModalBasic
            modalShow={modalShow}
            setModalShow={setModalShow}
            size={"xl"}
            title={"Structures"}
        >
            <Card.Body>
                <ModalBodyUniprot
                    estructure={estructure}
                    uniprotId={uniprotId}
                />
            </Card.Body>
        </ModalBasic>
    );
}

export default ModalUniprotDetail;
