import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";
import type { DataFullDetail } from "../types/ResponsePlumber";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";

interface ModalProps {
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    dataPlumber?: DataFullDetail;
    dataPublic?: ResponsePublicSummary;
}

function ModalFullDetail({
    modalShow,
    setModalShow,
    dataPlumber,
    dataPublic,
}: ModalProps) {
    return (
        <>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                contentClassName="p-3 font-monospace text-muted text-small"
            >
                <Modal.Header closeButton onClick={() => setModalShow(false)}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <img
                            src="/public/chromosome.png"
                            alt="icono"
                            className="me-2 rounded-circle"
                            style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                            }}
                        />{" "}
                        {dataPublic || dataPlumber ? (
                            <span>
                                {dataPublic?.name || dataPlumber?.entrez}
                            </span>
                        ) : null}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-3 small">
                    <ListGroup variant="flush">
                        {dataPublic ? (
                            <>
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs={3}>Summary</Col>
                                        <Col xs={9}>{dataPublic.summary}</Col>
                                    </Row>
                                </ListGroup.Item>
                            </>
                        ) : (
                            <></>
                        )}
                        {dataPlumber ? (
                            <>
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs={3}>Cytogenetic Location</Col>
                                        <Col xs={9}>
                                            {dataPlumber.location.citogenetic}{" "}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs={3}>Chromosome</Col>
                                        <Col xs={9}>
                                            {dataPlumber.location.chr}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs={3}>Strand</Col>
                                        <Col xs={9}>
                                            {dataPlumber.location.strand == "-"
                                                ? "3′ → 5′ (-)"
                                                : "5′ → 3′ (+)"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs={3}>Range</Col>
                                        <Col xs={9}>
                                            {dataPlumber.location.start} –{" "}
                                            {dataPlumber.location.end}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs={3}>Length</Col>
                                        <Col xs={9}>
                                            {dataPlumber.location.length}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {dataPlumber.ensembl_id_gene ? (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={3}>Ensembl Id Gene</Col>
                                            <Col xs={9}>
                                                {dataPlumber.ensembl_id_gene}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ) : (
                                    ""
                                )}
                                {dataPlumber.ensembl_id_protein ? (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={3}>Ensembl Id Protein</Col>
                                            <Col xs={9}>
                                                {dataPlumber.ensembl_id_protein}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ) : (
                                    ""
                                )}
                                {dataPlumber.uniprot_ids ? (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={3}>UniProt IDs</Col>
                                            <Col xs={9}>
                                                {dataPlumber.uniprot_ids?.join(
                                                    ", "
                                                )}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ) : (
                                    ""
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalFullDetail;
