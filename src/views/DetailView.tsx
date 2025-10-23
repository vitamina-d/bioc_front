import { useEffect, useState } from "react";
import { Card, CardHeader, CardImg, Container } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import { GetDetail, GetFullDetail } from "../services/BioconductorServices";
import { SummaryService } from "../services/PublicServices";
import type { Response } from "../types/Response";
import type { DataDetail, DataFullDetail } from "../types/DataPlumber";
import ButtonOverlay from "../Components/ButtonOverlay";
import InfoFullDetail from "../Components/InfoFullDetail";
import { useParams } from "react-router-dom";
import img from "../assets/chromosome.png";
import InfoDetailCopy from "../Components/InfoDetail copy";

function DetailView() {
    const { entrezId, searchInput } = useParams();
    const [detail, setDetail] = useState<DataDetail | null>(null);
    const [summary, setSummary] = useState<ResponsePublicSummary>();
    const [fullDetail, setFullDetail] = useState<DataFullDetail>();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await GetDetail(entrezId!); //! existe
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
            const biocResponse: Response<DataFullDetail> = await GetFullDetail(
                entrezId!
            );
            setFullDetail(biocResponse.data);
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
                    <ButtonOverlay
                        textHover={"FullDetail"}
                        typeIcon={"binocular"}
                        onClick={getFull}
                        variant="outline-secondary"
                        size="lg"
                    />
                </CardHeader>
            </Card>
            <Card>
                <Card.Body>
                    {/* DETAIL COMUN */}
                    <InfoDetailCopy data={detail} />

                    {/* MAS DETAIL */}
                    <InfoFullDetail
                        dataPublic={summary}
                        dataPlumber={fullDetail}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DetailView;
