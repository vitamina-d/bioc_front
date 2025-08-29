import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import Searcher from "../Components/Searcher";
import {
    GetDetail,
    GetFullDetail,
    GetPercent,
    GetSequence,
} from "../services/PlumberServices";
import { SummaryService } from "../services/PublicServices";
import SequenceViewer from "../Components/SequenceViewer";
import Header from "../Components/Header";
import PercentAccordion from "../Components/PercentAccordion";
import type {
    DataDetail,
    DataFullDetail,
    DataPercent,
    DataSequence,
    ResponsePlumber,
} from "../types/ResponsePlumber";
import InfoDetail from "../Components/InfoDetail";
import ModalFullDetail from "../Components/ModalFullDetail";

function HomeView() {
    const [input, setInput] = useState<string>("");
    const [publicData, setPublicData] = useState<ResponsePublicSummary>();
    const [detail, setDetail] = useState<DataDetail>();
    const [fullDetail, setFullDetail] = useState<DataFullDetail>();
    const [loading, setLoading] = useState<boolean>(false);

    const [sequence, setSequence] = useState<DataSequence>();
    const [percent, setPercent] = useState<DataPercent>();

    const [modalShow, setModalShow] = useState(false);

    //click en Searcher DETAIL BREVE
    const searchDetail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(detail);

        setLoading(true);
        setDetail(undefined);
        setPublicData(undefined);
        setSequence(undefined);
        try {
            const plumberRes: ResponsePlumber<DataDetail> = await GetDetail(
                input
            );
            setDetail(plumberRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    //click en Searcher
    const searchFullDetail = async () => {
        setLoading(true);
        setFullDetail(undefined);
        setPublicData(undefined);
        setSequence(undefined);
        try {
            const publicRes: ResponsePublicSummary = await SummaryService(
                input
            );
            console.log(publicRes);
            setPublicData(publicRes);
            const plumberRes: ResponsePlumber<DataFullDetail> =
                await GetFullDetail(input);
            console.log(plumberRes.data);
            setFullDetail(plumberRes.data);
            setModalShow(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    //click en +
    const handleClickSequence = async () => {
        try {
            const seqRes: ResponsePlumber<DataSequence> = await GetSequence(
                input,
                true
            );
            const percentRes: ResponsePlumber<DataPercent> = await GetPercent(
                seqRes.data.sequence
            );
            setSequence(seqRes.data);
            setPercent(percentRes.data);
            console.log(percentRes);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-3 my-3 ">
            <Card.Body>
                <Searcher
                    text={loading ? "Loading" : "Search"}
                    input={input}
                    setInput={setInput}
                    onSubmit={searchDetail}
                    //onClick={searchFullDetail}
                />
                {!loading && detail ? (
                    <>
                        <InfoDetail data={detail} onClick={searchFullDetail} />
                        <Button
                            variant="outline-dark"
                            className="m-2 mb-3"
                            onClick={handleClickSequence}
                        >
                            GET Sequence
                        </Button>
                    </>
                ) : (
                    <></>
                )}
                
                {sequence || percent ? ( //scrollIntoView
                    <Card className="shadow  my-3">
                        <Card.Body>
                            <Header
                                title="Sequence"
                                imageSrc={"/public/seq.png"}
                            />
                            {sequence ? <SequenceViewer data={sequence} /> : ""}
                            {percent ? <PercentAccordion data={percent} /> : ""}
                        </Card.Body>
                    </Card>
                ) : (
                    ""
                )}
            </Card.Body>
            <ModalFullDetail
                    modalShow={modalShow}
                    setModalShow={setModalShow}
                    dataPlumber={fullDetail}
                    dataPublic={publicData}
                />
        </Card>
    );
}

export default HomeView;
