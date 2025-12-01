import { Button, Col, Form, Row } from "react-bootstrap";
import CompareProteinViewer from "./CompareProteinViewer";
import { useState, type SetStateAction } from "react";
import { plddt } from "../config/plddt";
import PLDDT from "./PLDDT";
import { Icon } from "./Icon";
import Dropdown3DMolType from "./Dropdown3DMolType";

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
    const [checked, setChecked] = useState<boolean>(false);
    const [type, setType] = useState<"stick" | "cartoon" | "line" | "sphere">(
        "cartoon"
    );

    const downloadFile = (pdb: string, filename: string) => {
        const blob = new Blob([pdb], { type: "chemical/x-pdb" }); //memoria
        const url = URL.createObjectURL(blob); //enlace de descarga

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <>
            <Row>
                <Col md={3} className="border-end pe-3 font-monospace small">
                    <Form.Check
                        label="Show Reference"
                        type="checkbox"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                    />
                    <p>transparencia</p>
                    <Dropdown3DMolType type={type} setType={setType} />
                    <div>
                        {prediction && (
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                    downloadFile(
                                        prediction,
                                        filenames.prediction
                                    )
                                }
                            >
                                <Icon type={"download"} />
                                Prediction
                            </Button>
                        )}
                        {reference && (
                            <Button
                                variant="secondary"
                                size="sm"
                                className="ms-2"
                                onClick={() =>
                                    downloadFile(reference, filenames.reference)
                                }
                            >
                                <Icon type={"download"} />
                                Reference
                            </Button>
                        )}
                    </div>
                </Col>
                <Col md={9} className="border-end pe-3">
                    <CompareProteinViewer
                        prediction={prediction}
                        reference={reference}
                        predictionpLDDT={pLDDT}
                    />
                    <div className="d-flex justify-content-center">
                        {plddt.map((value) => (
                            <PLDDT text={value.text} color={value.color} />
                        ))}
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default ModalBodyEstructures;
