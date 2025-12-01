import { Card } from "react-bootstrap";
import ModalBasic from "./ModalBasic";
import ModalBodyEstructures from "./ModalBodyEstructures";
import type React from "react";
import PLDDT from "./PLDDT";
import { plddt } from "../config/plddt";

type Props = {
    prediction: string | null;
    reference: string | null;
    pLDDT: number[];
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    filenames: {
        prediction: string;
        reference: string;
    };
};

function ModalEstructures({
    modalShow,
    setModalShow,
    prediction,
    reference,
    pLDDT,
    filenames,
}: Props) {
    return (
        <ModalBasic
            modalShow={modalShow}
            setModalShow={setModalShow}
            size={"xl"}
            title={"Structures"}
        >
            <Card.Body>
                <ModalBodyEstructures
                    prediction={prediction}
                    reference={reference}
                    pLDDT={pLDDT}
                    filenames={filenames}
                />
            </Card.Body>
        </ModalBasic>
    );
}

export default ModalEstructures;
