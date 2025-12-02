import {
    Badge,
    Button,
    Card,
    CardHeader,
    Col,
    ListGroup,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import image from "../assets/image.webp";
import RankButtons from "./RankButtons";
import { Icon } from "./Icon";
import { Link } from "react-router-dom";
import type { Hit } from "../types/DataBlastx";
import type { ProteinRanks } from "../types/ResponseFolding";

type Props = {
    jobId: string | null;
    ranks: ProteinRanks | null;
    selected_rank: string | null;
    hit: Hit;
    protein: string;
    showButton: boolean;
    statusJob: string | null;
    selectRankToCompare: (rank: string) => void;
    initJobPrediction: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => Promise<void>;
    getStatus: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => Promise<void>;
    getRank: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => Promise<void>;
};

function SectionPredict({
    jobId,
    ranks,
    selected_rank,
    hit,
    protein,
    showButton,
    statusJob,
    selectRankToCompare,
    initJobPrediction,
    getStatus,
    getRank,
}: Props) {
    return (
        <Card className="my-3 mb-5">
            <CardHeader className="pt-3">
                <img src={image} height={"30px"} width={"30px"} />
                Predict structure with Alphafold{" "}
                <Link to="https://neurosnap.ai/" target="_blank">
                    (Neurosnap)
                </Link>
            </CardHeader>
            <Card.Body className="p-3">
                <ListGroup className="mb-3 font-monospace" variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col xs={3}>FALTA</Col>
                            <Col xs={9}>Agregar datos del hit</Col>
                        </Row>

                        <Row className="my-1">
                            <Col xs={3}>ACCESSION</Col>
                            <Col xs={9}>
                                <Badge className="p-2" bg="danger">
                                    {hit.description[0].accession}
                                </Badge>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>TITLE</Col>
                            <Col xs={9}>{hit.description[0].title}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={3}>FRAME</Col>
                            <Col xs={9}>{hit.hsps[0].query_frame}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={3}>PROTEIN TRADUCTION</Col>
                            <Col xs={6}>{protein}</Col>
                            <Col xs={3}>
                                {showButton && (
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            className="mt-3"
                                            variant="secondary"
                                            size={"sm"}
                                            onClick={initJobPrediction}
                                        >
                                            get prediction
                                        </Button>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {jobId && statusJob != null && (
                        <>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>JOB ID</Col>
                                    <Col xs={9}>{jobId}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>STATUS</Col>
                                    <Col xs={9}>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>
                                                    {"get status"}
                                                </Tooltip>
                                            }
                                        >
                                            <span className="d-inline-block">
                                                <Button
                                                    size={"sm"}
                                                    variant={
                                                        statusJob === "pending"
                                                            ? "secondary"
                                                            : statusJob ===
                                                              "running"
                                                            ? "warning"
                                                            : statusJob ===
                                                              "failed"
                                                            ? "danger"
                                                            : statusJob ===
                                                              "completed"
                                                            ? "success"
                                                            : "secondary" // defecto
                                                    }
                                                    onClick={getStatus}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <Icon type={"status"} />
                                                        {statusJob}
                                                    </div>
                                                </Button>
                                            </span>
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {statusJob == "completed" && ranks == null && (
                                <div className="d-flex justify-content-center">
                                    <Button
                                        className="mt-3"
                                        variant={"primary"}
                                        onClick={getRank}
                                    >
                                        GET RANKS
                                    </Button>
                                </div>
                            )}

                            {ranks != null && (
                                <RankButtons
                                    ranks={ranks}
                                    selectRankToCompare={selectRankToCompare}
                                    selected_rank={selected_rank}
                                />
                            )}
                        </>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default SectionPredict;
