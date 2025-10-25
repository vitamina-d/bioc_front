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
import { GeFullDetail, GetDetail, GetStats } from "../services/PlumberServices";
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
import InfoDetailCopy from "../Components/InfoDetail";
import SequenceShow from "../Components/SequenceShow";
import PercentPlots from "../Components/PercentPlots";
import ModalBasic from "../Components/ModalBasic";

function DetailView() {
    const { entrezId, searchInput } = useParams();
    const [detail, setDetail] = useState<DataDetail | null>(null);
    const [summary, setSummary] = useState<ResponsePublicSummary>();
    const [fullDetail, setFullDetail] = useState<DataFullDetail>();
    const [dataStats, setDataStats] = useState<DataStats | null>(null);
    const [showStats, setshowStats] = useState<boolean>(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response: Response<DataDetail> = await GetDetail(entrezId!); //! existe
                console.log(response);
                setDetail(response.data);
            } catch {
                console.log("no se encontro");
            }
        };
        fetchDetail();
    }, [entrezId]);

    const getFull = async () => {
        setFullDetail(undefined);
        setSummary(undefined);
        try {
            const publicRes: Response<ResponsePublicSummary> =
                await SummaryService(entrezId!);
            setSummary(publicRes.data);
            const biocResponse: Response<DataFullDetail> = await GeFullDetail(entrezId!);
            setFullDetail(biocResponse.data);
        } catch (err) {
            console.error(err);
        }
    };
    const getStats = async () => {
        try {
            const seqAndStats: Response<DataStats> = await GetStats(
                entrezId!,
                true
            );
            console.log("data: ", seqAndStats.data);
            setDataStats(seqAndStats.data);
            setshowStats(true);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <Container fluid className="mt-3">
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
                            onClick={getFull}
                            variant="outline-secondary"
                            size="lg"
                        />
                        <ButtonOverlay
                            textHover={"Sequence"}
                            typeIcon={"finger"}
                            onClick={getStats}
                            variant="outline-primary"
                            size="lg"
                        />{" "}
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <Card.Body>
                    <ListGroup className="mb-3" variant="flush">
                        {/* DETAIL COMUN */}
                        <InfoDetailCopy data={detail} />
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
                            {dataStats ? (
                                <>
                                    <SequenceShow
                                        row={4}
                                        sequence={dataStats.sequence}
                                    />
                                    <PercentPlots dataStats={dataStats} />
                                </>
                            ) : (
                                ""
                            )}{" "}
                        </Modal.Body>
                    </ModalBasic>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DetailView;
