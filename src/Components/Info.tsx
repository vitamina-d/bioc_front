import { CardBody, Col, ListGroup, Row } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import type { DataPlumberDetail } from "../types/ResponsePlumberDetail";

interface InfoProps {
    dataPublic?: ResponsePublicSummary;
    dataPlumber?: DataPlumberDetail;
}

function Info({ dataPublic, dataPlumber }: InfoProps) {
    return (
        <>
            <div className="d-flex align-items-center mb-2 p-3">
                <img
                    src="/public/chromosome.png"
                    alt="icono"
                    className="me-2 rounded-circle"
                    style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                    }}
                />

                <div>
                    {dataPublic || dataPlumber ? (
                        <h5 className="card-title mb-1">
                            {dataPublic?.name || dataPlumber?.entrezID}
                        </h5>
                    ) : (
                        ""
                    )}
                    {dataPublic ? (
                        <p className="card-text text-muted ">{`${dataPublic.scientificname} (Tax ID: ${dataPublic.taxId})`}</p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <CardBody>
                <ListGroup variant="flush">
                    {dataPublic ? (
                        <>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>Description</Col>
                                    <Col xs={9}>{dataPublic.description}</Col>
                                </Row>
                            </ListGroup.Item>
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
                                    <Col xs={3}>Type</Col>
                                    <Col xs={9}>{dataPlumber.type}</Col>
                                </Row>
                            </ListGroup.Item>
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
                                    <Col xs={9}>{dataPlumber.location.chr}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>Strand</Col>
                                    <Col xs={9}>
                                        {dataPlumber.location.strand}
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
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>Ensembl Id Gene</Col>
                                    <Col xs={9}>
                                        {dataPlumber.ensembl_id_gene}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>Ensembl Id Protein</Col>
                                    <Col xs={9}>
                                        {dataPlumber.ensembl_id_protein}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>UniProt IDs</Col>
                                    <Col xs={9}>
                                        {dataPlumber.uniprot_ids?.join(", ")}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </>
                    ) : (
                        <></>
                    )}
                </ListGroup>
            </CardBody>
        </>
    );
}

export default Info;
