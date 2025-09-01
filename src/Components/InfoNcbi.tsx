import { CardBody, Col, ListGroup, Row } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";

type Props = {
    data: ResponsePublicSummary;
}

function InfoNcbi({ data }: Props) {
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
                    <h5 className="card-title mb-1">{data.name}</h5>
                    <p className="card-text text-muted ">{`${data.scientificname} (Tax ID: ${data.taxId})`}</p>
                </div>
            </div>
            <CardBody>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col xs={3}>Description</Col>
                            <Col xs={9}>{data.description}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={3}>Summary</Col>
                            <Col xs={9}>{data.summary}</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </CardBody>
        </>
    );
}

export default InfoNcbi;
