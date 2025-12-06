import { Col, Form, Row } from "react-bootstrap";
import CompareProteinViewer from "./CompareProteinViewer";
import { useState } from "react";
import { plddt } from "../constant/plddt";
import PLDDT from "./PLDDT";
import Dropdown3DMolType from "./Dropdown3DMolType";
import DownloadButtons from "./DownloadButtons";
import Secondary from "./Secondary";
import type { Hit } from "../types/DataBlastx";

type Props = {
    prediction: string | null;
    reference: string | null;
    pLDDT: number[];
    filenames: {
        prediction: string;
        reference: string;
    };
    hit: Hit | null;
};

function ModalBodyEstructures({
    prediction,
    reference,
    pLDDT,
    filenames,
    hit,
}: Props) {
    const [showReference, setShowReference] = useState<boolean>(true);
    const [type, setType] = useState<"stick" | "cartoon" | "line" | "sphere">(
        "cartoon"
    );

    return (
        <>
            <Row className="p-0">
                <Col sm={12} lg={9} className=" p-0 ">
                    {hit
                        ? hit.hsps.map((hit) => (
                              <Secondary
                                  key={"hit-aminoacids"}
                                  hseq={hit.hseq}
                                  qseq={hit.qseq}
                              />
                          ))
                        : ""}
                </Col>
                <Col sm={12} lg={3} className="font-monospace small">
                    <Dropdown3DMolType type={type} setType={setType} />
                    <Form.Check
                        className="d-flex justify-content-end"
                        label="Show Reference"
                        type="checkbox"
                        checked={showReference}
                        disabled={reference == null}
                        onChange={() => setShowReference(!showReference)}
                    />
                    <DownloadButtons
                        prediction={prediction}
                        reference={reference}
                        filenames={filenames}
                    />
                </Col>
            </Row>
            <Row className="border-end">
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
            </Row>
        </>
    );
}

export default ModalBodyEstructures;
