import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardImg,
    Container,
    ListGroup,
    Modal,
} from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import { GetDetail, GetStats } from "../services/PlumberServices";
import { SummaryService } from "../services/PublicServices";
import type { Response } from "../types/Response";
import type {
    DataDetail,
    DataFullDetail,
    DataStats,
} from "../types/DataPlumber";
import ButtonOverlay from "../Components/ButtonOverlay";
import InfoFullDetail from "../Components/InfoFullDetail";
import { useParams } from "react-router-dom";
import img from "../assets/chromosome.png";
import InfoDetail from "../Components/InfoDetail";
import SequenceShow from "../Components/SequenceShow";
import PercentPlots from "../Components/PercentPlots";
import ModalBasic from "../Components/ModalBasic";
import { useToastContext } from "../context/ToastContext";
import { useSpinnerContext } from "../context/SpinnerContext";

function DetailView() {
    const { showToast } = useToastContext();
    const { showSpinner, hideSpinner } = useSpinnerContext();

    const { entrezId, searchInput } = useParams();
    const [detail, setDetail] = useState<DataDetail | null>(null);
    const [summary, setSummary] = useState<ResponsePublicSummary>();
    const [fullDetail, setFullDetail] = useState<DataFullDetail>();
    const [dataStats, setDataStats] = useState<DataStats | null>(null);
    const [showStats, setshowStats] = useState<boolean>(false);

    useEffect(() => {
        const fetchDetail = async () => {
            var isFull: boolean = false;
            const response: Response<DataDetail> | null = await GetDetail(
                entrezId!,
                isFull,
                showToast
            ); //! existe
            if (!response || !response.data) {
                showToast("No se encontro el id.", "Warning", "warning");
                return;
            }
            console.log(response);
            setDetail(response.data);
        };
        fetchDetail();
    }, [entrezId]);

    //GET FULL DETAIL
    const getFull = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        var isFull: boolean = true;
        showSpinner();

        setSummary(undefined);
        setFullDetail(undefined);

        const publicRes: Response<ResponsePublicSummary> | null =
            await SummaryService(entrezId!, showToast);
        const biocResponse: Response<DataFullDetail> | null = await GetDetail(
            entrezId!,
            isFull,
            showToast
        );

        setSummary(publicRes?.data);
        setFullDetail(biocResponse?.data);
        hideSpinner();
    };

    //GET STATS DE LA SECUENCIA
    const getStats = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        showSpinner();

        const seqAndStats: Response<DataStats> | null = await GetStats(
            entrezId!,
            true,
            showToast
        );

        if (!seqAndStats || !seqAndStats.data) {
            hideSpinner();
            return;
        }
        setDataStats(seqAndStats.data);
        setshowStats(true);
        hideSpinner();
    };

    return (
        <Container fluid className="pb-5 mt-3 mb-5">
            <Card className=" font-monospace text-muted text-small">
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <div className=" ps-2 pt-1 d-flex align-items-center">
                        <CardImg
                            src={img}
                            alt="icono"
                            className="me-2 rounded-circle"
                            style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                            }}
                        />

                        <h5 className="card-title mb-1">find:{searchInput}</h5>
                    </div>
                    <div className="gap-2 d-flex align-items-center">
                        <ButtonOverlay
                            textHover={"FullDetail"}
                            typeIcon={"binocular"}
                            onClick={(event) => getFull(event)}
                            variant="outline-secondary"
                            size="lg"
                        />
                        <ButtonOverlay
                            textHover={"Sequence"}
                            typeIcon={"finger"}
                            onClick={(event) => getStats(event)}
                            variant="outline-primary"
                            size="lg"
                        />
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <Card.Body>
                    <ListGroup className="mb-3" variant="flush">
                        {/* DETAIL COMUN */}
                        <InfoDetail data={detail} />
                        {/* MAS DETAIL */}
                        <InfoFullDetail
                            dataPublic={summary}
                            dataPlumber={fullDetail}
                        />
                    </ListGroup>
                    {/* LOS STATS */}
                    <ModalBasic
                        modalShow={showStats}
                        setModalShow={setshowStats}
                        size={"xl"}
                        title={"Sequence and Stats"}
                    >
                        <Modal.Body>
                            {dataStats && (
                                <>
                                    <SequenceShow
                                        row={4}
                                        sequence={dataStats.sequence}
                                    />
                                    <PercentPlots dataStats={dataStats} />
                                </>
                            )}
                        </Modal.Body>
                    </ModalBasic>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DetailView;
