import { useState } from "react";
import { Card, CardHeader } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import { GetFullDetail, GetStats } from "../services/BioconductorServices";
import { SummaryService } from "../services/PublicServices";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import type {
    DataDetail,
    DataFullDetail,
    DataStats,
} from "../types/DataPlumber";
import InfoDetail from "../Components/InfoDetail";
import PercentPlots from "../Components/PercentPlots";
import ButtonOverlay from "../Components/ButtonOverlay";
import InfoFullDetail from "../Components/InfoFullDetail";
import SequenceShow from "../Components/SequenceShow";

type Props = {
    detail: DataDetail | null;
};

function DetailView({ detail }: Props) {
    
    const [summary, setSummary] = useState<ResponsePublicSummary>();
    const [fullDetail, setFullDetail] = useState<DataFullDetail>();
    const [dataStats, setDataStats] = useState<DataStats | null>(null);

    //ultimos consultados
    if (!detail) return <>Nothing found, search again</>;
    const entrez = detail.entrez;

    const getFull = async () => {
        setFullDetail(undefined);
        setSummary(undefined);
        try {
            const publicResponse: ResponsePublicSummary = await SummaryService(
                entrez
            );
            console.log(publicResponse);
            setSummary(publicResponse);
            const biocResponse: ResponsePlumber<DataFullDetail> =
                await GetFullDetail(entrez);
            console.log(biocResponse);
            setFullDetail(biocResponse.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getStats = async () => {
        try {
            const seqAndStats: ResponsePlumber<DataStats> = await GetStats(
                entrez,
                true
            );
            console.log(seqAndStats);
            console.log(seqAndStats.data);

            setDataStats(seqAndStats.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className=" font-monospace text-muted text-small">
            <CardHeader>
                <div className="d-flex align-items-center p-3">
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
                    <div>
                        <h5 className="card-title mb-1">
                            {detail ? detail.symbol : "Search"}
                        </h5>
                    </div>
                    <ButtonOverlay
                        textHover={"Detail"}
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
                    />
                </div>
            </CardHeader>
            <Card.Body>
                <InfoDetail data={detail} />
                <InfoFullDetail dataPublic={summary} dataPlumber={fullDetail} />
                {dataStats ? (
                    <>
                        <SequenceShow sequence={dataStats.sequence} />

                        <PercentPlots dataStats={dataStats} />
                    </>
                ) : (
                    ""
                )}
            </Card.Body>
        </Card>
    );
}

export default DetailView;
