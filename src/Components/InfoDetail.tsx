import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import type { DataDetail } from "../types/DataPlumber";
import React from "react";

type Props = {
    data: DataDetail | null;
};

function InfoDetail({ data }: Props) {
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
                        <Col xs={6}>
                            {" "}
                            <Badge className="bg-secondary m-1">{data.symbol}</Badge>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs={6}>Alias</Col>
                        <Col xs={6}>
                            {data.alias &&
                                data.alias.map((alias, idx) => (
                                    <React.Fragment key={idx}>
                                        <Badge className="bg-dark m-1">
                                            {alias}
                                        </Badge>
                                    </React.Fragment>
                                ))}
                        </Col>
                    </Row>
                </ListGroup.Item>
            </>
        )
    );
}

export default InfoDetail;
