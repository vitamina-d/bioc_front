import { Col, ListGroup, Row } from "react-bootstrap";
import type { DataDetail } from "../types/DataPlumber";

type Props = {
    data: DataDetail | null;
};

function InfoDetailCopy({ data }: Props) {
    return (
        data && (
            <>
                <ListGroup.Item>
                    <Row>
                        <Col xs={6}>Entrez</Col>
                        <Col xs={6}>{data.entrez}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={6}>Genetype</Col>
                        <Col xs={6}>{data.genetype}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={6}>Genename</Col>
                        <Col xs={6}>{data.genename}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={6}>Symbol</Col>
                        <Col xs={6}>{data.symbol}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={6}>Alias</Col>
                        <Col xs={6}>
                            {data.alias ? data.alias.join(", ") : "—"}
                        </Col>
                    </Row>
                </ListGroup.Item>
            </>
        )
    );
}

export default InfoDetailCopy;
