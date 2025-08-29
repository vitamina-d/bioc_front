import { Button, Card, CardBody, Col, Row } from "react-bootstrap";
import type { DataDetail } from "../types/ResponsePlumber";
import Header from "./Header";

interface InfoDetailProps {
    data?: DataDetail;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function InfoDetail({ data, onClick }: InfoDetailProps) {
    return (
        data && (
            <Card className="shadow p-3 my-3 mb-5">
                <Header title="Gene" imageSrc="../../public/gene.png" />

                {data.alias ? (
                    <CardBody>
                        <Row>
                            <Col lg={1} className="text-center">
                                <div>Entrez</div>
                                <div className="text-muted">{data.entrez}</div>
                            </Col>
                            <Col lg={2} className="text-center">
                                <div>Genetype</div>
                                <div className="text-muted ">
                                    {data.genetype}
                                </div>
                            </Col>
                            <Col lg={4} className="text-center">
                                <div>Genename</div>
                                <div className="text-muted ">
                                    {data.genename}
                                </div>
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
                            <Col
                                lg={1}
                                className="d-flex align-items-center justify-content-center"
                            >
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={onClick}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                    >
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                                    </svg>
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                ) : (
                    ""
                )}
            </Card>
        )
    );
}

export default InfoDetail;
