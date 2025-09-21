import { CardBody, Col, ListGroup, Row } from "react-bootstrap";
import type { DataFullDetail } from "../types/DataPlumber";

type Props = {
    data: DataFullDetail;
};

function InfoPlumber({ data }: Props) {
    console.log(data);
    return (
        <CardBody>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                        <Col xs={3}>Genetype</Col>
                        <Col xs={9}>{data.genetype}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={3}>Cytogenetic Location</Col>
                        <Col xs={9}>{data.citogenetic} </Col>
                    </Row>
                </ListGroup.Item>
                {data.location.map((item) => (
                    <>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>Chromosome</Col>
                                <Col xs={9}>{item.seqnames}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>Strand</Col>
                                <Col xs={9}>{item.strand}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>Range</Col>
                                <Col xs={9}>
                                    {item.start} – {item.end}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>Length</Col>
                                <Col xs={9}>{item.length}</Col>
                            </Row>
                        </ListGroup.Item>
                    </>
                ))}
                <ListGroup.Item>
                    <Row>
                        <Col xs={3}>Ensembl Id Gene</Col>
                        <Col xs={9}>{data.ensembl_id_gene}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={3}>Ensembl Id Protein</Col>
                        <Col xs={9}>{data.ensembl_id_protein}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={3}>UniProt IDs</Col>
                        <Col xs={9}>{data.uniprot_ids?.join(", ")}</Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </CardBody>
    );
}

export default InfoPlumber;
