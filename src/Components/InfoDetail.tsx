import { CardBody, Col, Row } from "react-bootstrap";
import type { DataDetail } from "../types/ResponsePlumber";
import ButtonOverlay from "./ButtonOverlay";

type Props = {
    data: DataDetail;
    getFull: React.MouseEventHandler<HTMLButtonElement>;
    getSequence: React.MouseEventHandler<HTMLButtonElement>;
}

function InfoDetail({ data, getFull, getSequence }: Props) {
    return (
        data && (
            <>
                <CardBody className="mb-3" >
                    <Row>
                        <Col lg={1} className="text-center">
                            <div>Entrez</div>
                            <div className="text-muted">{data.entrez}</div>
                        </Col>
                        <Col lg={2} className="text-center">
                            <div>Genetype</div>
                            <div className="text-muted ">{data.genetype}</div>
                        </Col>
                        <Col lg={3} className="text-center">
                            <div>Genename</div>
                            <div className="text-muted ">{data.genename}</div>
                        </Col>
                        <Col lg={1} className="text-center">
                            <div>Symbol</div>
                            <div className="text-muted ">{data.symbol}</div>
                        </Col>
                        <Col lg={3} className="text-center">
                            <div>Alias</div>
                            <div className="text-muted ">
                                {data.alias ? data.alias.join(", ") : "—"}
                            </div>
                        </Col>
                        <Col lg={2} className="text-center">
                            <div>Action</div>
                            <div className="d-flex justify-content-center">
                                <ButtonOverlay
                                    textHover={"Detail"}
                                    typeIcon={"binocular"}
                                    onClick={getFull}
                                    variant="outline-dark"
                                    size="lg"
                                />
                                <ButtonOverlay
                                    textHover={"Sequence"}
                                    typeIcon={"finger"}
                                    onClick={getSequence}
                                    variant="outline-primary"
                                    size="lg"
                                />
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </>
        )
    );
}

export default InfoDetail;
