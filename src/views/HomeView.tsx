import { useState } from "react";
import { Card } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import {
    GetFullDetail,
    GetPercent,
    GetSequence,
} from "../services/PlumberServices";
import { SummaryService } from "../services/PublicServices";
import Header from "../Components/Header";
import type {
    DataDetail,
    DataFullDetail,
    DataPercent,
    DataSequence,
    //DataSequence,
    ResponsePlumber,
} from "../types/ResponsePlumber";
import InfoDetail from "../Components/InfoDetail";
import ModalFullDetail from "../Components/ModalFullDetail";
import ModalSequence from "../Components/ModalSequence";
import SequenceViewer from "../Components/SequenceViewer";

interface HomeProps {
    detail: DataDetail | null;
}

function HomeView({ detail }: HomeProps) {
    const [summary, setSummary] = useState<ResponsePublicSummary>();
    const [fullDetail, setFullDetail] = useState<DataFullDetail>();

    const [dataPercent, setDataPercent] = useState<DataPercent | null>(null);
    const [dataSequence, setDataSequence] = useState<DataSequence | null>(null);

    const [modalDetailShow, setModalDetailShow] = useState(false);
    const [modalChartShow, setModalChartShow] = useState(false);

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
    const handleClickSequence = async () => {
        try {
            const seqRes: ResponsePlumber<DataSequence> = await GetSequence(
                entrez,
                true
            );
            console.log(seqRes);
            setDataSequence(seqRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            console.error("FINALLY GetSequence");
        }
    };
    //click en +
    const handleClickPercent = async () => {
        try {
            const seqRes: ResponsePlumber<DataSequence> = await GetSequence(
                entrez,
                true
            );
            const percentRes: ResponsePlumber<DataPercent> = await GetPercent(
                seqRes.data.sequence
            );
            console.log(percentRes);
            console.log(seqRes);
            setDataSequence(seqRes.data);
            setDataPercent(percentRes.data);
            setModalChartShow(true);
        } catch (err) {
            console.error(err);
        } finally {
            console.error("FINALLY GetSequence GetPercent");
        }
    };
    return (
        <Card className="p-3 my-3 ">
            <Header title="Gene" imageSrc="../../public/gene.png" />
            <Card.Body>
                <InfoDetail
                    data={detail}
                    getFull={searchFullDetail}
                    getSequence={handleClickSequence}
                    getPercent={handleClickPercent}
                />
                {dataSequence ? (
                    <SequenceViewer
                        title={"Sequence"}
                        sequence={dataSequence.sequence}
                        readonly={true}
                        clear={false}
                    />
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
            <ModalSequence
                modalShow={modalChartShow}
                setModalShow={setModalChartShow}
                dataSequence={dataSequence}
                dataPercent={dataPercent}
            />
        </Card>
    );
}

export default HomeView;
