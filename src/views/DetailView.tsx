import { useEffect, useState } from "react";
import { Card, CardHeader, Container } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import { GetDetail, GetFullDetail } from "../services/BioconductorServices";
import { SummaryService } from "../services/PublicServices";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import type { DataDetail, DataFullDetail } from "../types/DataPlumber";
import InfoDetail from "../Components/InfoDetail";
import ButtonOverlay from "../Components/ButtonOverlay";
import InfoFullDetail from "../Components/InfoFullDetail";
import { useParams } from "react-router-dom";

function DetailView() {
    const { entrezId } = useParams();
    const [detail, setDetail] = useState<DataDetail | null>(null);
    const [summary, setSummary] = useState<ResponsePublicSummary>();
    const [fullDetail, setFullDetail] = useState<DataFullDetail>();

    useEffect(() => {
        const fetchDetail = async () => {
            console.log("PARAMS", entrezId);
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
            const publicRes: ResponsePublicSummary = await SummaryService(
                entrezId!
            );
            console.log(publicRes);
            setSummary(publicRes);
            const biocResponse: ResponsePlumber<DataFullDetail> =
                await GetFullDetail(entrezId!);
            console.log(biocResponse);
            setFullDetail(biocResponse.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container fluid className="mt-3">
            <Card className=" font-monospace text-muted text-small">
                <CardHeader>
                    <div className=" ps-2 pt-1 d-flex align-items-center">
                        <img
                            src="../../public/chromosome.png"
                            alt="icono"
                            className="me-2 rounded-circle"
                            style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                            }}
                        />
                        <h5 className="card-title mb-1">find:{entrezId}</h5>
                    </div>
                </CardHeader>
                <Card.Body>
                    {/* DETAIL COMUN */}
                    <InfoDetail data={detail}>
                        <ButtonOverlay
                            textHover={"FullDetail"}
                            typeIcon={"binocular"}
                            onClick={getFull}
                            variant="outline-secondary"
                            size="lg"
                        />
                    </InfoDetail>

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
