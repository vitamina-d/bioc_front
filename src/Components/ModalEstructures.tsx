import { Card } from "react-bootstrap";
import ModalBasic from "./ModalBasic";
import ModalBodyEstructures from "./ModalBodyEstructures";
import type React from "react";
import type { Hit } from "../types/DataBlastx";

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
    hit: Hit | null;
};

function ModalEstructures({
    modalShow,
    setModalShow,
    prediction,
    reference,
    pLDDT,
    filenames,
    hit,
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
                    hit={hit}
                />
            </Card.Body>
        </ModalBasic>
    );
}

export default ModalEstructures;
