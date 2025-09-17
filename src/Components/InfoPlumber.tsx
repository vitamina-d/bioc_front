import { CardBody, Col, ListGroup, Row } from "react-bootstrap";
import type { DataFullDetail } from "../types/ResponseBioconductor";

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
                        <Col xs={9}>{data.location.citogenetic} </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={3}>Chromosome</Col>
                        <Col xs={9}>{data.location.chr}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={3}>Strand</Col>
                        <Col xs={9}>{data.location.strand}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={3}>Range</Col>
                        <Col xs={9}>
                            {data.location.start} – {data.location.end}
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={3}>Length</Col>
                        <Col xs={9}>{data.location.length}</Col>
                    </Row>
                </ListGroup.Item>
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
