import {
    Button,
    Card,
    CardHeader,
    Col,
    Container,
    ListGroup,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import Header from "../Components/Header";
import type { BlastxReport } from "../types/DataBlastx";
import { useState } from "react";
import BlastxTable from "../Components/BlastxTable";
import SequenceViewer from "../Components/SequenceViewer";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import { PostBlastx } from "../services/BlastServices";
import ModalBasic from "../Components/ModalBasic";
import { GetTranslate } from "../services/PythonServices";
import type { Sequence } from "../types/DataPython";
import img from "../assets/search-gene.png";
import {
    GetAlignPrediction,
    GetRanksJob,
    InitJob,
    StatusJob,
} from "../services/FoldingServices";
import type { ProteinRanks, ResponseStatus } from "../types/ResponseFolding";
import { Icon } from "../Components/Icon";
import imgns from "../assets/image.webp";
import TableRanks from "../Components/TableRanks";
import { useNavigate } from "react-router-dom";
import ProteinViewer from "../Components/ProteinViewer";

//https://neurosnap.ai/job/68e17d82e986d44f8b7e9e1b

function BlastxView() {
    const navigate = useNavigate();

    const [blastx, setBlastx] = useState<BlastxReport | null>(null);
    const [sequence, setSequence] = useState<string>("");
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [modificable, setModificable] = useState<boolean>(true);
    const [frame, setFrame] = useState<number | null>(null);
    const [protein, setProtein] = useState<string>("");
    const [jobId, setJobId] = useState<string | null>(null);
    const [statusJob, setStatusJob] = useState<string | null>(null);
    const [showButton, setShowButton] = useState<boolean>(true);
    const [ranks, setRanks] = useState<ProteinRanks | null>(null);
    const [pdbId, setPdbId] = useState<string>("");
    const [modalStructureShow, setModalStructureShow] =
        useState<boolean>(false);
    const [pdbString, setPdbString] = useState<string>("");

    //busca los hits de la secuencia de entrada
    const getBlastxReport = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        console.log("QUERY: ", sequence);
        const response: ResponsePlumber<BlastxReport> = await PostBlastx(
            sequence.trim()
        );
        console.log(response);
        setBlastx(response.data);
        setModificable(false);
        setModalShow(true);
    };

    //limpiar
    const clearInput = () => {
        setModificable(true);
        setSequence("");
        setFrame(null);
        setProtein("");
    };

    //obtener traduccion segun el frame del hit seleccionado
    const getTraduction = async (frame: number, pdbId: string) => {
        // ya me traigo la referencia pdbid
        setModalShow(false);
        setFrame(frame);
        //pdb|6JEH|B
        console.log("PDBID -----> ", pdbId.split("|")[1]);
        setPdbId(pdbId.split("|")[1]);
        const response: ResponsePlumber<Sequence> = await GetTranslate(
            sequence.trim(),
            frame
        );
        setProtein(response.data.sequence);
    };

    //inicia la prediccion en neurosnap y verifica el estado. oculta el button
    const initJobPrediction = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        console.log("INIT JOB");
        const response: string = await InitJob(protein);
        console.log(response);
        setJobId(response);
        //const jobStatus: ResponseStatus = await StatusJob(response);
        const jobStatus: ResponseStatus = await StatusJob(
            "68e17d82e986d44f8b7e9e1b"
        );
        const status = JSON.parse(jobStatus.status);
        console.log(status);
        setStatusJob(status);
        setShowButton(false);
    };
    //Actualiza el status del button
    const getStatus = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!jobId) return;
        event.preventDefault();
        console.log("STATUS JOB");
        //const jobStatus: ResponseStatus = await StatusJob(jobId);
        const jobStatus: ResponseStatus = await StatusJob(
            "68e17d82e986d44f8b7e9e1b"
        );
        const status = JSON.parse(jobStatus.status);
        console.log(status);
        setStatusJob(status);
    };

    //hace la consulta de los 5 ranks de prediccion de neurosnap
    const getRank = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!jobId) return;
        event.preventDefault();
        console.log("STATUS JOB");
        //const jobStatus: ResponseStatus = await StatusJob(jobId);
        const ranks: ProteinRanks = await GetRanksJob(
            "68e17d82e986d44f8b7e9e1b"
        );
        console.log(ranks);
        setRanks(ranks);
    };

    //onClick del button rank seleccionado para visualizar la estructura
    const selectRankToCompare = async (rank: string) => {
        // el rank
        //job/{jobId}/rank_{rank}/align/{pdbId}
        console.log("ALIGN: jobid ", jobId, ", rank: ", rank, "pdbId: ", pdbId);
        const align: string = await GetAlignPrediction(
            "68e17d82e986d44f8b7e9e1b",
            rank,
            pdbId
        );
        console.log(align);
        setPdbString(align);
        setModalStructureShow(true);
    };
    //const goToProteinView = async (rank: string) => {// el rank
    //    navigate("/protein", { state: { jobId: "68e17d82e986d44f8b7e9e1b", rank: rank, pdbId: pdbId } });
    //}
    return (
        <Container fluid className="mt-3 ">
            <Header
                title="blastx"
                text="Ingrese una secuencia de nucleotidos. blastx traduce y compara contra una base de datos de proteínas."
                imageSrc={img}
            />
            <SequenceViewer
                title={"Query"}
                sequence={sequence}
                setSequence={setSequence}
                readonly={!modificable}
                onClick={clearInput}
            >
                <div className="d-flex justify-content-end">
                    {modificable ? (
                        <Button
                            variant="secondary"
                            size={"sm"}
                            onClick={(event) => getBlastxReport(event)}
                        >
                            get hits
                        </Button>
                    ) : (
                        <Button
                            variant="secondary"
                            size={"sm"}
                            onClick={() => setModalShow(true)}
                        >
                            show hits
                        </Button>
                    )}
                </div>
            </SequenceViewer>

            {/* MODAL RESULT BLAST */}
            <ModalBasic
                modalShow={modalShow}
                setModalShow={setModalShow}
                size={"xl"}
                title={"Result blastx"}
            >
                <Card.Body>
                    {blastx ? (
                        <BlastxTable
                            data={blastx}
                            handleCompare={getTraduction}
                        />
                    ) : (
                        ""
                    )}
                </Card.Body>
            </ModalBasic>

            {/* SECTION PREDICT */}
            {frame != null ? (
                <Card className="my-3">
                    <CardHeader className="pt-3">
                        <img src={imgns} height={"30px"} width={"30px"} />
                        Predict structure
                    </CardHeader>
                    <Card.Body className="p-3">
                        <ListGroup
                            className="mb-3 font-monospace"
                            variant="flush"
                        >
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>FALTA</Col>
                                    <Col xs={9}>
                                        Agregar datos de donde vengo
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>FRAME</Col>
                                    <Col xs={9}>{frame}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>PROTEIN TRADUCTION</Col>
                                    <Col xs={9}>{protein}</Col>
                                </Row>
                            </ListGroup.Item>
                            {showButton ? (
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
                            ) : (
                                ""
                            )}

                            {jobId && statusJob != null ? (
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
                                                                statusJob ===
                                                                "pending"
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
                                                                <Icon
                                                                    type={
                                                                        "status"
                                                                    }
                                                                />
                                                                {statusJob}
                                                            </div>
                                                        </Button>
                                                    </span>
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {statusJob == "completed" &&
                                    ranks == null ? (
                                        <div className="d-flex justify-content-center">
                                            <Button
                                                className="mt-3"
                                                variant={"primary"}
                                                onClick={getRank}
                                            >
                                                GET RANKS
                                            </Button>
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                    {ranks != null ? (
                                        <>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col xs={3}>
                                                        UNCERTAINTY
                                                    </Col>
                                                    <Col xs={9}>
                                                        <TableRanks
                                                            data={ranks}
                                                            selectRankToCompare={
                                                                selectRankToCompare
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="d-flex justify-content-center mt-3">
                                                    Select rank to compare
                                                    structures.
                                                </Row>
                                            </ListGroup.Item>

                                            {/* MODAL PROTEINS */}
                                            <ModalBasic
                                                modalShow={modalStructureShow}
                                                setModalShow={
                                                    setModalStructureShow
                                                }
                                                size={"xl"}
                                                title={"Structures"}
                                            >
                                                <Card.Body>
                                                    {pdbString ? (
                                                        <ProteinViewer
                                                            pdbId={pdbId}
                                                            prediction={
                                                                pdbString
                                                            }
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </Card.Body>
                                            </ModalBasic>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </>
                            ) : (
                                ""
                            )}
                        </ListGroup>
                    </Card.Body>
                </Card>
            ) : (
                ""
            )}
        </Container>
    );
}

export default BlastxView;
