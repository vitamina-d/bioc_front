import { useState } from "react";
import { Card } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import { GetFullDetail, GetStats } from "../services/PlumberServices";
import { SummaryService } from "../services/PublicServices";
import Header from "../Components/Header";
import type {
    DataDetail,
    DataFullDetail,
    DataStats,
    //DataSequence,
    ResponsePlumber,
} from "../types/ResponsePlumber";
import InfoDetail from "../Components/InfoDetail";
import ModalFullDetail from "../Components/ModalFullDetail";
import SequenceViewer from "../Components/SequenceViewer";
import PercentPlots from "../Components/PercentPlots";

type Props = {
    detail: DataDetail | null;
}

function HomeView({ detail }: Props) {
    const [summary, setSummary] = useState<ResponsePublicSummary>();
    const [fullDetail, setFullDetail] = useState<DataFullDetail>();

    const [dataStats, setDataStats] = useState<DataStats | null>(null);

    const [modalDetailShow, setModalDetailShow] = useState(false);

    if (!detail) return <></>;
    const entrez = detail.entrez;

    //click en Searcher
    const searchFullDetail = async () => {
        setFullDetail(undefined);
        setSummary(undefined);
        try {
            const publicRes: ResponsePublicSummary = await SummaryService(
                entrez
            );
            console.log(publicRes);
            setSummary(publicRes);
            const plumberRes: ResponsePlumber<DataFullDetail> =
                await GetFullDetail(entrez);
            console.log(plumberRes);
            setFullDetail(plumberRes.data);
            setModalDetailShow(true);
        } catch (err) {
            console.error(err);
        } finally {
            console.error("FINALLY SummaryService GetFullDetail");
        }
    };

    //click en +
    const handleClickStats = async () => {
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
        } finally {
            console.error("FINALLY GetSequence");
        }
    };

    return (
        <Card className="p-3 my-3 ">
            <Header title="Gene" imageSrc="../../public/gene.png" />
            <Card.Body>
                <InfoDetail
                    data={detail}
                    getFull={searchFullDetail}
                    getStats={handleClickStats}
                />
                {dataStats ? (
                    <>
                        <SequenceViewer
                            title={"Sequence"}
                            sequence={dataStats.sequence}
                            readonly={true}

                        />

                        <PercentPlots dataStats={dataStats} />
                    </>
                ) : (
                    ""
                )}
            </Card.Body>
            <ModalFullDetail
                modalShow={modalDetailShow}
                setModalShow={setModalDetailShow}
                dataPlumber={fullDetail}
                dataPublic={summary}
            />
        </Card>
    );
}

export default HomeView;
