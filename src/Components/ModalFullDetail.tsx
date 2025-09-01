import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";
import type { DataFullDetail } from "../types/ResponsePlumber";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";

type Props = {
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
}: Props) {
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
                                            {dataPlumber.citogenetic}{" "}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {dataPlumber.location.map((range, idx) => (
                                    <>
                                        <ListGroup.Item key={idx}>
                                            <Row>
                                                <Col xs={3}>
                                                    Location {`${idx+1}`}
                                                </Col>
                                                <Col xs={9}>
                                                    {`${range.seqnames}: ${
                                                        range.start
                                                    } to ${
                                                        range.end
                                                    } | Lenght: ${
                                                        range.length
                                                    } | Strand: ${
                                                        range.strand == "-"
                                                            ? "Strand: 3′ → 5′ (-)"
                                                            : "Strand: 5′ → 3′ (+)"
                                                    }`}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </>
                                ))}

                                {dataPlumber.ensembl_id_gene ? (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={3}>Ensembl Id Gene</Col>
                                            <Col xs={9}>
                                                {dataPlumber.ensembl_id_gene?.join(
                                                    ", "
                                                )}
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
                                                {dataPlumber.ensembl_id_protein?.join(
                                                    ", "
                                                )}
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
                    <Button
                        className="font-base"
                        variant={"secondary"}
                        onClick={() => setModalShow(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalFullDetail;
