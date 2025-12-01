import { Button, Container } from "react-bootstrap";
import Header from "../Components/Header";
import type { BlastxReport, Hit } from "../types/DataBlastx";
import { useEffect, useState } from "react";
import SequenceViewer from "../Components/SequenceViewer";
import type { Response } from "../types/Response";
import { PostBlastx } from "../services/BlastServices";
import { GetTranslate } from "../services/PythonServices";
import type { Sequence } from "../types/DataPython";
import img from "../assets/search-gene.png";
import {
    GetAlignPrediction,
    GetModelReference,
    GetpLDDTPrediction,
    GetRanksJob,
    InitJob,
    StatusJob,
} from "../services/FoldingServices";
import type { ProteinRanks } from "../types/ResponseFolding";
import { useSpinnerContext } from "../context/SpinnerContext";
import { useToastContext } from "../context/ToastContext";
import { validateNucleotides } from "../utils/validateNucleotides";
import type { pLDDTNeurosnap } from "../types/pLDDT";
import ModalEstructures from "../Components/ModalEstructures";
import ModalHits from "../Components/ModalHits";
import SectionPredict from "../Components/SectionPredict";

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
    const [modalStructureShow, setModalStructureShow] = useState<boolean>(true);
    const [prediction, setPrediction] = useState<string | null>(null);
    const [reference, setReference] = useState<string | null>(null);
    const [pLDDT, setpLDDT] = useState<number[]>([]);

    const [hit, setHit] = useState<Hit | null>(null);
    const [filenames, setFilenames] = useState({
        prediction: "",
        reference: "",
    });

    useEffect(() => {
        console.log("useEffect: nuevo Hit");
        if (hit != null) {
            console.log(hit);

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
        console.log("getTraduction click ", hit);
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
        showSpinner();

        const response: Response<string> | null = await InitJob(
            protein,
            showToast,
            "Prediccion iniciada en Neurosnap Alphafold2. Verifique el estado."
        );
        console.log(response);
        if (!response || !response.data) {
            hideSpinner();
            return;
        }
        setJobId(response.data);

        //status
        const jobStatus: Response<string> | null = await StatusJob(
            response.data,
            showToast
        );
        if (!jobStatus || !jobStatus.data) {
            hideSpinner();
            return;
        }
        const status = jobStatus.data;
        setStatusJob(status);
        setShowButton(false);
        hideSpinner();
    };

    //Actualiza el status del button
    const getStatus = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!jobId) return;
        event.preventDefault();
        showSpinner();
        //status
        const jobStatus: Response<string> | null = await StatusJob(
            jobId,
            showToast
        );
        if (!jobStatus || !jobStatus.data) {
            hideSpinner();
            return;
        }
        const status = jobStatus.data;
        console.log(status);
        setStatusJob(status);
        hideSpinner();
    };

    //hace la consulta de los 5 ranks de prediccion de neurosnap
    const getRank = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!jobId) return;
        event.preventDefault();
        showSpinner();
        const ranks: Response<ProteinRanks> = await GetRanksJob(jobId);
        console.log(ranks);
        setRanks(ranks.data);
        hideSpinner();
    };

    //onClick del button rank seleccionado para visualizar las estructuras
    const selectRankToCompare = async (rank: string) => {
        showSpinner();
        setFilenames({
            prediction: `prediction_${jobId}_rank${rank}.pdb`,
            reference: `reference_${accession}.pdb`,
        });
        const pdbPrediction: string = await GetAlignPrediction(
            jobId!,
            rank,
            accession
        );
        setPrediction(pdbPrediction);
        const pdbReference: string = await GetModelReference(accession);
        setReference(pdbReference);
        const plddt: Response<pLDDTNeurosnap> = await GetpLDDTPrediction(
            jobId!,
            rank
        );
        setpLDDT(plddt.data.plddt);
        console.log(plddt);
        setModalStructureShow(true);
        hideSpinner();
    };

    return (
        <Container fluid className="mt-3 pb-5">
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
            <ModalHits
                blastx={blastx}
                setHit={setHit}
                modalShow={modalShow}
                setModalShow={setModalShow}
            />

            {/* SECTION PREDICT */}
            {hit != null && (
                <SectionPredict
                    jobId={jobId}
                    ranks={ranks}
                    hit={hit}
                    protein={protein}
                    showButton={showButton}
                    statusJob={statusJob}
                    selectRankToCompare={selectRankToCompare}
                    initJobPrediction={initJobPrediction}
                    getStatus={getStatus}
                    getRank={getRank}
                />
            )}
            {/* MODAL PROTEINS */}
            <ModalEstructures
                modalShow={modalStructureShow}
                setModalShow={setModalStructureShow}
                prediction={prediction}
                reference={reference}
                pLDDT={pLDDT}
                filenames={filenames}
            />
        </Container>
    );
}

export default BlastxView;
