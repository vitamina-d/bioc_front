import { Col, Form, Row } from "react-bootstrap";
import CompareProteinViewer from "./CompareProteinViewer";
import { useState } from "react";
import { plddt } from "../config/plddt";
import PLDDT from "./PLDDT";
import Dropdown3DMolType from "./Dropdown3DMolType";
import DownloadButtons from "./DownloadButtons";

type Props = {
    prediction: string | null;
    reference: string | null;
    pLDDT: number[];
    filenames: {
        prediction: string;
        reference: string;
    };
};

function ModalBodyEstructures({
    prediction,
    reference,
    pLDDT,
    filenames,
}: Props) {
    const [showReference, setShowReference] = useState<boolean>(true);
    const [type, setType] = useState<"stick" | "cartoon" | "line" | "sphere">(
        "cartoon"
    );

    return (
        <Row>
            <Col md={3} className="border-end pe-3 font-monospace small">
                <Form.Check
                    label="Show Reference"
                    type="checkbox"
                    checked={showReference}
                    disabled={reference == null}
                    onChange={() => setShowReference(!showReference)}
                />
                <p>transparencia</p>
                <Dropdown3DMolType type={type} setType={setType} />
                <DownloadButtons
                    prediction={prediction}
                    reference={reference}
                    filenames={filenames}
                />
            </Col>
            <Col md={9} className="border-end pe-3">
                <CompareProteinViewer
                    prediction={prediction}
                    reference={reference}
                    predictionpLDDT={pLDDT}
                    style={type}
                    showReference={showReference}
                />
                <div className="d-flex justify-content-center gap-3">
                    {plddt.map((value) => (
                        <PLDDT text={value.text} color={value.color} />
                    ))}
                </div>
            </Col>
        </Row>
    );
}

export default ModalBodyEstructures;
