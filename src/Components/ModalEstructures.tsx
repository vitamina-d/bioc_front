import { Card } from "react-bootstrap";
import ModalBasic from "./ModalBasic";
import ModalBodyEstructures from "./ModalBodyEstructures";
import type React from "react";

type Props = {
    prediction: string | null;
    reference: string | null;
    pLDDT: number[];
    modalShow: boolean;
    setModalShow:  React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalEstructures({ modalShow, setModalShow, prediction, reference, pLDDT }: Props) {
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
                />
            </Card.Body>
        </ModalBasic>
    );
}

export default ModalEstructures;
