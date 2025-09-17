import { Col, ListGroup, Row } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import type { DataFullDetail } from "../types/ResponsePlumber";

type Props = {
    dataPublic?: ResponsePublicSummary;
    dataPlumber?: DataFullDetail;
};

function InfoFull({ dataPublic, dataPlumber }: Props) {
    return (
        <ListGroup className="mb-3" variant="flush">
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
                            <Col xs={9}>{dataPlumber.citogenetic} </Col>
                        </Row>
                    </ListGroup.Item>
                    {dataPlumber.location.map((range, idx) => (
                        <>
                            <ListGroup.Item key={idx}>
                                <Row>
                                    <Col xs={3}>Location {`${idx + 1}`}</Col>
                                    <Col xs={9}>
                                        {`${range.seqnames}: ${
                                            range.start
                                        } to ${range.end} | Lenght: ${
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
                                    {dataPlumber.ensembl_id_gene?.join(", ")}
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
                                    {dataPlumber.ensembl_id_protein?.join(", ")}
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
                                    {dataPlumber.uniprot_ids?.join(", ")}
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
    );
}

export default InfoFull;
