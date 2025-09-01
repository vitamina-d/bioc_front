import { Card, CardBody, Col, ListGroup, Row } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import type { DataFullDetail } from "../types/ResponsePlumber";

type Props = {
    dataPublic?: ResponsePublicSummary;
    dataPlumber?: DataFullDetail;
};

function InfoFull({ dataPublic, dataPlumber }: Props) {
    return (
        <Card className="shadow p-3 my-3 mb-5">
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
                            {dataPublic?.name || dataPlumber?.entrez}
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
                                    <Col xs={9}>{dataPlumber.genetype}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>Cytogenetic Location</Col>
                                    <Col xs={9}>{dataPlumber.citogenetic}</Col>
                                </Row>
                            </ListGroup.Item>

                            {dataPlumber.location.map((item) => (
                                <>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={3}>Chromosome</Col>
                                            <Col xs={9}>
                                                {item.seqnames}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={3}>Strand</Col>
                                            <Col xs={9}>
                                                {item.strand ==
                                                "-"
                                                    ? "3′ → 5′ (-)"
                                                    : "5′ → 3′ (+)"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={3}>Range</Col>
                                            <Col xs={9}>
                                                {item.start} –{" "}
                                                {item.end}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={3}>Length</Col>
                                            <Col xs={9}>
                                                {item.length}
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
            </CardBody>
        </Card>
    );
}

export default InfoFull;
