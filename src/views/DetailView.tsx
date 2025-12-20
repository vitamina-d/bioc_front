import { useEffect, useState, type FormEvent } from "react";
import {
    Card,
    CardHeader,
    CardImg,
    Container,
    ListGroup,
} from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import { GetDetail } from "../services/PlumberServices";
import { GetModel, SummaryService } from "../services/PublicServices";
import type { Response } from "../types/Response";
import type { DataDetail, DataFullDetail } from "../types/DataPlumber";
import ButtonOverlay from "../Components/ButtonOverlay";
import InfoFullDetail from "../Components/InfoFullDetail";
import { useNavigate, useParams } from "react-router-dom";
import img from "../assets/gene.png";
import InfoDetail from "../Components/InfoDetail";
import { useToastContext } from "../context/ToastContext";
import { useSpinnerContext } from "../context/SpinnerContext";
import ModalUniprotDetail from "../Components/ModalUniprotDetail";

function DetailView() {
    const { showToast } = useToastContext();
    const { showSpinner, hideSpinner } = useSpinnerContext();
    const navigate = useNavigate();

    const { entrezId, searchInput } = useParams();
    const [detail, setDetail] = useState<DataDetail | null>(null);
    const [summary, setSummary] = useState<ResponsePublicSummary>();
    const [fullDetail, setFullDetail] = useState<DataFullDetail>();
    const [modalUniprot, setModalUniprot] = useState<boolean>(false);
    const [uniprotId, setUniprotId] = useState<string>("");
    const [estructure, setEstructure] = useState<string>("");
    const [selectedUniprot, setSelectedUniprot] = useState<string>("");

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
                navigate("/bioc_front")
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

    //GET UNIPROT
    const getUniprot = async (event: FormEvent, select_unip: string) => {
        event.preventDefault();
        if (selectedUniprot == select_unip) {
            setModalUniprot(true);
            return;
        }
        setSelectedUniprot(select_unip);
        showSpinner();
        setUniprotId(select_unip);
        const response: string | null = await GetModel(select_unip, showToast);

        if (!response) {
            hideSpinner();
            return;
        }
        setEstructure(response);
        setModalUniprot(true);
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

                        <h5 className="card-title mb-1">
                            find:{searchInput ? searchInput : entrezId}
                        </h5>
                    </div>
                    <div className="gap-2 d-flex align-items-center">
                        <ButtonOverlay
                            textHover={"FullDetail"}
                            typeIcon={"binocular"}
                            onClick={(event) => getFull(event)}
                            variant="outline-secondary"
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
                            getUniprot={getUniprot}
                            selectedUniprot={selectedUniprot}
                        />
                    </ListGroup>
                    {/* MODAL PROTEINS */}
                    <ModalUniprotDetail
                        modalShow={modalUniprot}
                        setModalShow={setModalUniprot}
                        estructure={estructure}
                        uniprotId={uniprotId}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DetailView;
