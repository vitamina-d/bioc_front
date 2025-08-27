import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import type {
    DataPlumberDetail,
    ResponsePlumberDetail,
} from "../types/ResponsePlumberDetail";
import Searcher from "../Components/Searcher";
import Info from "../Components/Info";
import {
    GetDetail,
    GetPercent,
    GetSequence,
} from "../services/PlumberServices";
import { SummaryService } from "../services/PublicServices";
import type {
    DataPlumberSequence,
    ResponsePlumberSequence,
} from "../types/ResponsePlumberSequence";
import SequenceViewer from "../Components/SequenceViewer";
import Header from "../Components/Header";
import type {
    DataPlumberPercent,
    ResponsePlumberPercent,
} from "../types/ResponsePlumberPercent";
import PercentAccordion from "../Components/PercentAccordion";

function HomeView() {
    const [input, setInput] = useState<string>("");
    const [data, setData] = useState<ResponsePublicSummary>();
    const [detail, setDetail] = useState<DataPlumberDetail>();
    const [loading, setLoading] = useState<boolean>(false);

    const [sequence, setSequence] = useState<DataPlumberSequence>();
    const [percent, setPercent] = useState<DataPlumberPercent>();

    //click en Searcher
    const handleClickSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setDetail(undefined);
        setData(undefined);
        setSequence(undefined);
        try {
            const publicRes: ResponsePublicSummary = await SummaryService(
                input
            );
            setData(publicRes);
            const plumberRes: ResponsePlumberDetail = await GetDetail(input);
            setDetail(plumberRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    //click en +
    const handleClickSequence = async () => {
        try {
            const seqRes: ResponsePlumberSequence = await GetSequence(
                input,
                true
            );
            const percentRes: ResponsePlumberPercent = await GetPercent(
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
                    onClick={handleClickSearch}
                />
                {!loading && (data || detail) ? (
                    <Card className="shadow p-3 my-3 mb-5">
                        <Info dataPublic={data} dataPlumber={detail} />
                        <Card.Text className="text-center">
                            <Button
                                variant="outline-dark"
                                className="m-2 mb-3"
                                onClick={handleClickSequence}
                            >
                                GET Sequence
                            </Button>
                        </Card.Text>
                    </Card>
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
        </Card>
    );
}

export default HomeView;
