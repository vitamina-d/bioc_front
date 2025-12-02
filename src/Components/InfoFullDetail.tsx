import { Badge, Col, ListGroup, Modal, Row } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import type {
    DataFullDetail,
    DataSequence,
    Location,
} from "../types/DataPlumber";
import React, { useState } from "react";
import ButtonOverlay from "./ButtonOverlay";
import { GetSequenceByRange } from "../services/PlumberServices";
import { useSpinnerContext } from "../context/SpinnerContext";
import { useToastContext } from "../context/ToastContext";
import type { Response } from "../types/Response";
import ModalBasic from "./ModalBasic";
import SequenceShow from "./SequenceShow";

type Props = {
    dataPublic?: ResponsePublicSummary;
    dataPlumber?: DataFullDetail;
};

function InfoFullDetail({ dataPublic, dataPlumber }: Props) {
    const { showSpinner, hideSpinner } = useSpinnerContext();
    const { showToast } = useToastContext();

    const [sequence, setSequence] = useState<string>("");
    const [showSequence, setShowSequence] = useState<boolean>(false);

    //GET SEQUENCE
    const getSequence = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        range: Location
    ) => {
        event.preventDefault();
        console.log("PLUMBER: range:", range);
        showSpinner();

        const chr: string = range.seqnames.startsWith("chr")
            ? range.seqnames.substring(3)
            : range.seqnames;
        
        const response: Response<DataSequence[]> | null =
            await GetSequenceByRange(
                chr,
                range.start,
                range.end,
                showToast
            );

        if (
            !response ||
            !response.data ||
            !response.data[0] ||
            !response.data[0].sequence
        ) {
            hideSpinner();
            return;
        }
        setSequence(response.data[0].sequence);
        setShowSequence(true);
        hideSpinner();
    };

    return (
        <>
            {dataPublic && (
                <>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={3}>Summary</Col>
                            <Col xs={9}>{dataPublic.summary}</Col>
                        </Row>
                    </ListGroup.Item>
                </>
            )}
            {dataPlumber && (
                <>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={3}>Cytogenetic Location</Col>
                            <Col xs={9}>{dataPlumber.citogenetic} </Col>
                        </Row>
                    </ListGroup.Item>
                    {dataPlumber.location.length > 0 &&
                        dataPlumber.location.map((range, idx) => (
                            <React.Fragment key={`location${idx}`}>
                                <ListGroup.Item>
                                    <Row className="d-flex align-items-center ">
                                        <Col xs={3}>Location {idx}</Col>
                                        <Col xs={8}>
                                            {`${range.seqnames}: ${
                                                range.start
                                            } to ${range.end} (lenght: ${
                                                range.length
                                            }) | Strand ${
                                                range.strand == "-"
                                                    ? "3′ → 5′ (-)"
                                                    : "5′ → 3′ (+)"
                                            }`}
                                        </Col>
                                        <Col xs={1}>
                                            <ButtonOverlay
                                                textHover="Sequence"
                                                typeIcon="finger"
                                                onClick={(event) =>
                                                    getSequence(event, range)
                                                }
                                                variant="outline-success"
                                                size="lg"
                                            />
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </React.Fragment>
                        ))}

                    {dataPlumber.ensembl_id_gene.length > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>Ensembl Id Gene</Col>
                                <Col xs={9}>
                                    {dataPlumber.ensembl_id_gene.map(
                                        (prot, idx) => (
                                            <React.Fragment key={idx}>
                                                <Badge className="bg-prymary m-1">
                                                    {prot}
                                                </Badge>
                                            </React.Fragment>
                                        )
                                    )}{" "}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    {dataPlumber.ensembl_id_protein.length > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>Ensembl Id Protein</Col>
                                <Col xs={9}>
                                    {dataPlumber.ensembl_id_protein.map(
                                        (prot, idx) => (
                                            <React.Fragment key={idx}>
                                                <Badge className="bg-success m-1">
                                                    {prot}
                                                </Badge>
                                            </React.Fragment>
                                        )
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    {dataPlumber.uniprot_ids.length > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>UniProt IDs</Col>
                                <Col xs={9}>
                                    {dataPlumber.uniprot_ids.map(
                                        (unip, idx) => (
                                            <React.Fragment key={idx}>
                                                <Badge className="bg-warning m-1">
                                                    {unip}
                                                </Badge>
                                            </React.Fragment>
                                        )
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}

                    {/* LA SEQUENCE */}
                    <ModalBasic
                        modalShow={showSequence}
                        setModalShow={setShowSequence}
                        size={"xl"}
                        title={"Sequence"}
                    >
                        <Modal.Body>
                            {sequence != "" && (
                                <SequenceShow sequence={sequence} />
                            )}
                        </Modal.Body>
                        {/*<PercentPlots dataStats={dataStats} />*/}
                    </ModalBasic>
                </>
            )}
        </>
    );
}

export default InfoFullDetail;
