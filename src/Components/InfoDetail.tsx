import { CardBody, Col, Row } from "react-bootstrap";
import type { DataDetail } from "../types/DataPlumber";
import type { ReactNode } from "react";

type Props = {
    data: DataDetail | null;
    children: ReactNode;
};

function InfoDetail({ data, children }: Props) {
    return (
        data && (
            <>
                <CardBody className="mb-3">
                    <Row className="d-flex align-items-center">
                        <Col xs={1} className="text-center">
                            <div>Entrez</div>
                            <div className="text-muted">{data.entrez}</div>
                        </Col>
                        <Col xs={2} className="text-center">
                            <div>Genetype</div>
                            <div className="text-muted ">{data.genetype}</div>
                        </Col>
                        <Col xs={4} className="text-center">
                            <div>Genename</div>
                            <div className="text-muted ">{data.genename}</div>
                        </Col>
                        <Col xs={1} className="text-center">
                            <div>Symbol</div>
                            <div className="text-muted ">{data.symbol}</div>
                        </Col>
                        <Col xs={3} className="text-center">
                            <div>Alias</div>
                            <div className="text-muted ">
                                {data.alias ? data.alias.join(", ") : "—"}
                            </div>
                        </Col>
                        <Col xs={1} className="text-center">
                            <div>More</div>
                            <div>{children}</div>
                        </Col>
                    </Row>
                </CardBody>
            </>
        )
    );
}

export default InfoDetail;
