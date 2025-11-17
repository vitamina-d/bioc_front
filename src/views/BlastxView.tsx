import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    Col,
    Container,
    ListGroup,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import Header from "../Components/Header";
import type { BlastxReport, Hit } from "../types/DataBlastx";
import { useEffect, useState } from "react";
import BlastxTable from "../Components/BlastxTable";
import SequenceViewer from "../Components/SequenceViewer";
import type { Response } from "../types/Response";
import { PostBlastx } from "../services/BlastServices";
import ModalBasic from "../Components/ModalBasic";
import { GetTranslate } from "../services/PythonServices";
import type { Sequence } from "../types/DataPython";
import img from "../assets/search-gene.png";
import {
    GetAlignPrediction,
    GetModelReference,
    GetpLDDTModel,
    GetpLDDTPrediction,
    GetRanksJob,
    InitJob,
    StatusJob,
} from "../services/FoldingServices";
import type { ProteinRanks } from "../types/ResponseFolding";
import { Icon } from "../Components/Icon";
import image from "../assets/image.webp";
import TableRanks from "../Components/TableRanks";
import ProteinViewer from "../Components/ProteinViewer";
import { useSpinnerContext } from "../context/SpinnerContext";
import { useToastContext } from "../context/ToastContext";
import BlastxStat from "../Components/BlastxStat";
import { validateNucleotides } from "../utils/validateNucleotides";
import { Link } from "react-router-dom";
import type { pLDDTModel, pLDDTNeurosnap } from "../types/pLDDT";

function BlastxView() {
    const { showToast } = useToastContext();
    const { showSpinner, hideSpinner } = useSpinnerContext();

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
    const [accession, setAccession] = useState<string>("");
    const [modalStructureShow, setModalStructureShow] =
        useState<boolean>(false);
    const [prediction, setPrediction] = useState<string | null>(null);
    const [reference, setReference] = useState<string | null>(null);
    const [pLDDTPrediction, setpLDDTPrediction] = useState<number[]>([]);
    const [pLDDTReference, setpLDDTReference] = useState<number[] | null>(null);

    const [hit, setHit] = useState<Hit | null>(null);

    useEffect(() => {
        console.log("useEFECT")
        if (hit != null) {
            
            getTraduction();
        }
    }, [hit]);

    //busca los hits de la secuencia de entrada
    const getBlastxReport = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        showSpinner();

        if (!validateNucleotides(sequence)) {
            hideSpinner();
            showToast("Ingrese una secuencia valida.", "Warning", "warning");
            return;
        }
        console.log("QUERY: ", sequence);
        const response: Response<BlastxReport> | null = await PostBlastx(
            sequence.toUpperCase(),
            showToast
        );
        console.log(response);
        if (
            !response ||
            !response.data ||
            response.data.results.search.hits.length == 0
        ) {
            hideSpinner();
            return;
        }
        setBlastx(response.data);
        setModificable(false);
        setModalShow(true);
        hideSpinner();
    };

    //limpiar
    const clearInput = () => {
        setModificable(true);
        setSequence("");
        setFrame(null);
        setProtein("");
    };

    //obtener traduccion segun el frame del hit seleccionado
    const getTraduction = async () => {
        console.log("useEffect ------------------- NUEVO HIT: ", hit);
        //limpiar
        showSpinner();
        setFrame(null);
        setJobId(null);
        setStatusJob(null);
        setShowButton(true);

        console.log(hit);
        setModalShow(false);
        //setFrame(hit.hsps[0].query_frame);
        //setHit(hit);
        
        setAccession(hit!.description[0].accession);
        const response: Response<Sequence> | null = await GetTranslate(
            sequence.trim(),
            hit!.hsps[0].query_frame,
            showToast
        );
        if (!response || !response.data) {
            hideSpinner();
            return;
        }
        setProtein(response.data.sequence);
        hideSpinner();
    };

    //inicia la prediccion en neurosnap y verifica el estado. oculta el button
    const initJobPrediction = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        console.log("INIT JOB"); //no credits
        const response: Response<string> = await InitJob(protein);
        console.log(response);
        setJobId(response.data);
        const jobStatus: Response<string> = await StatusJob(response.data);
        const status = jobStatus.data;
        setStatusJob(status);
        setShowButton(false);
    };
    //Actualiza el status del button
    const getStatus = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!jobId) return;
        event.preventDefault();
        const jobStatus: Response<string> = await StatusJob(jobId);
        const status = jobStatus.data;
        console.log(status);
        setStatusJob(status);
    };

    //hace la consulta de los 5 ranks de prediccion de neurosnap
    const getRank = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!jobId) return;
        event.preventDefault();
        const ranks: Response<ProteinRanks> = await GetRanksJob(jobId);
        console.log(ranks);
        setRanks(ranks.data);
    };

    //onClick del button rank seleccionado para visualizar las estructuras
    const selectRankToCompare = async (rank: string) => {
        console.log(
            "jobid ",
            jobId,
            ", rank_",
            rank,
            "accession: ",
            accession,
            "-------------------------------------------------------------------------"
        );
        const pdbPrediction: string = await GetAlignPrediction(
            jobId!,
            rank,
            accession
        );
        setPrediction(pdbPrediction);
        const pdbReference: string = await GetModelReference(accession);
        setReference(pdbReference);
        const plddtPrediction: Response<pLDDTNeurosnap> = await GetpLDDTPrediction(jobId!, rank)
        console.log(plddtPrediction)
        const plddtReference: Response<pLDDTModel> = await GetpLDDTModel(accession)
        console.log("plddtPrediction: ", plddtPrediction)
        console.log("plddtReference: ", plddtReference)
        setpLDDTPrediction(plddtPrediction.data.plddt);

        //metadata
        //GetpLDDTPrediction
        //GET /api/Folding/job/{jobId}/rank_{rank}/pLDDT
        //GetpLDDTModel
        //GET /api/Folding/model/pLDDT/{accession}
        setModalStructureShow(true);
    };

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
                            disabled={sequence == ""}
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
                    {blastx && (
                        <BlastxTable
                            hits={blastx?.results.search.hits}
                            setHit={setHit}
                        />
                    )}
                </Card.Body>
                <CardFooter>
                    {blastx?.results.search.stat && (
                        <BlastxStat data={blastx?.results.search.stat} />
                    )}
                </CardFooter>
            </ModalBasic>

            {/* SECTION PREDICT */}
            {hit != null && (
                <Card className="my-3">
                    <CardHeader className="pt-3">
                        <img src={image} height={"30px"} width={"30px"} />
                        Predict structure with Alphafold <Link to="https://neurosnap.ai/" target="_blank">(Neurosnap)</Link> 
                    </CardHeader>
                    <Card.Body className="p-3">
                        <ListGroup
                            className="mb-3 font-monospace"
                            variant="flush"
                        >
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={3}>FALTA</Col>
                                    <Col xs={9}>Agregar datos del hit</Col>
                                </Row>
                                    
                                        <Row>
                                            <Col xs={3}>ACCESSION</Col>
                                            <Col xs={9}>
                                                {hit.description[0].accession}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={3}>TITLE</Col>
                                            <Col xs={9}>
                                                {hit.description[0].title}
                                            </Col>
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
                                                >get prediction</Button>
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
                                        ranks == null && (
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
                                                    {prediction && reference && (
                                                        <ProteinViewer
                                                            prediction={
                                                                prediction
                                                            }
                                                            reference={
                                                                reference
                                                            }
                                                            predictionpLDDT={pLDDTPrediction}
                                                        />
                                                    )}
                                                </Card.Body>
                                            </ModalBasic>
                                        </>
                                    )}
                                </>
                            )}
                        </ListGroup>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default BlastxView;
