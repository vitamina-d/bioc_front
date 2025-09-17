import { CardBody, Col, Row } from "react-bootstrap";
import type { DataDetail } from "../types/ResponsePlumber";

type Props = {
    data: DataDetail | null;
};

function InfoDetail({ data }: Props) {
    return (
        data && (
            <>
                <CardBody className="mb-3">
                    <Row>
                        <Col lg={1} className="text-center">
                            <div>Entrez</div>
                            <div className="text-muted">{data.entrez}</div>
                        </Col>

                        <Col lg={5} className="text-center">
                            <div>Genename</div>
                            <div className="text-muted ">{data.genename}</div>
                        </Col>
                        <Col lg={1} className="text-center">
                            <div>Symbol</div>
                            <div className="text-muted ">{data.symbol}</div>
                        </Col>
                        <Col lg={5} className="text-center">
                            <div>Alias</div>
                            <div className="text-muted ">
                                {data.alias ? data.alias.join(", ") : "—"}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </>
        )
    );
}

export default InfoDetail;
