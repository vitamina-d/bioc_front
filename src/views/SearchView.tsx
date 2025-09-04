import { useEffect, useState, type FormEvent } from "react";
import { Button, Card, Form } from "react-bootstrap";
import SequenceViewer from "../Components/SequenceViewer";
import {
    GetComplement,
    GetFullDetail,
    GetSequenceByRange,
    GetStats,
} from "../services/PlumberServices";
import Header from "../Components/Header";
import type {
    DataComplement,
    DataDetail,
    DataFullDetail,
    DataSequence,
    DataStats,
    ResponsePlumber,
} from "../types/ResponsePlumber";
import Searcher from "../Components/Searcher";
import InputRange from "../Components/InputRange";
import DropdownChr from "../Components/DropdownChr";
import InfoDetail from "../Components/InfoDetail";
import { SummaryService } from "../services/PublicServices";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import PercentPlots from "../Components/PercentPlots";
import ModalBasic from "../Components/ModalBasic";
import InfoFullDetail from "../Components/InfoFullDetail";

type Props = {
    detail: DataDetail | null;
    setDetail: React.Dispatch<React.SetStateAction<DataDetail | null>>;
};

function SearchView({ detail, setDetail }: Props) {
    const [entrez, setEntrez] = useState("");

    //RANGE
    const [start, setStart] = useState("100000");
    const [end, setEnd] = useState("100100");
    const [chr, setChr] = useState<string | null>(null);
    const [sequence, setSequence] = useState<string>("");

    //SEARCH
    const [input, setInput] = useState("");

    /// COMPLEMENT
    const [output, setOutput] = useState<string>("");
    const [toReverse, setToReverse] = useState(false);
    const [toComplement, setToComplement] = useState(false);

    ///OPTION

    /////HOME
    const [summary, setSummary] = useState<ResponsePublicSummary>();
    const [fullDetail, setFullDetail] = useState<DataFullDetail>();
    const [dataStats, setDataStats] = useState<DataStats | null>(null);
    //const [modalDetailShow, setModalDetailShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        handleReverseComplement();
    }, [toReverse, toComplement]);

    useEffect(() => {
        if (detail) {
            setEntrez(detail.entrez);
            setFullDetail(undefined);
            setSummary(undefined);
            setSequence("");
            setModalShow(true);
            setDataStats(null);
            console.log("useEffect set entrez");
        }
    }, [detail]);

    //COMPLEMENT
    const handleReverseComplement = async () => {
        if (sequence != "") {
            const response: ResponsePlumber<DataComplement> =
                await GetComplement(sequence, toReverse, toComplement);
            setOutput(response.data.sequence);
            console.log(response.data);
        }
    };
    //TO DO
    const submitSearch = async (event: FormEvent) => {
        event.preventDefault();
        alert(input);
    };
    const submitRange = async (event: FormEvent) => {
        event.preventDefault();

        console.log("PLUMBER: chr:", chr, "start", start, "end", end);

        if (!chr) {
            alert("chr");
            return;
        }
        const response: ResponsePlumber<DataSequence> =
            await GetSequenceByRange(chr, parseInt(start), parseInt(end));

        console.log(response);
        setSequence(response.data.sequence);
    };

    //clear
    const clearSequence = () => {
        setToReverse(false);
        setToComplement(false);
        setOutput("");
        setSequence("");
        setSummary(undefined);
        setFullDetail(undefined);
        setDataStats(null);
        setDetail(null);
    };
    const clearOutput = () => {
        setToReverse(false);
        setToComplement(false);
        setOutput("");
    };

    /////// lo de home view
    //click en Searcher
    const searchFullDetail = async () => {
        console.log("searchFullDetail, input:  ", input, " entrez: ", entrez);

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

            // setModalDetailShow(true);
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
            setModalShow(false);
            setDataStats(seqAndStats.data);
            if (seqAndStats.data) {
                setSequence(seqAndStats.data.sequence);
            }
        } catch (err) {
            console.error(err);
        } finally {
            console.error("FINALLY GetSequence");
        }
    };

    return (
        <>
            <Card className="p-3 my-3 ">
                <Header
                    title={detail ? detail.symbol : "Search"}
                    text={detail ? detail.entrez : "Gene"}
                    imageSrc="../../public/gene.png"
                />

                <Searcher
                    text={"Search"}
                    input={input}
                    setInput={setInput}
                    onSubmit={submitSearch}
                    disabled={input == ""}
                />

                <Form onSubmit={submitRange}>
                    <div className="row mx-1 ">
                        <div className="col">
                            <DropdownChr chr={chr} setChr={setChr} />
                        </div>
                        <div className="col">
                            <InputRange number={start} setNumber={setStart}>
                                Desde
                            </InputRange>
                        </div>
                        <div className="col">
                            <InputRange number={end} setNumber={setEnd}>
                                Hasta
                            </InputRange>
                        </div>

                        <div className="col-auto">
                            <Button
                                variant="light"
                                className="border"
                                onClick={submitRange}
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                </Form>

                <div className=" mx-3 pb-0 ">
                    <Form>
                        {" "}
                        <Form.Check
                            type="switch"
                            id="reverse-switch"
                            label="Reverse"
                            checked={toReverse}
                            onChange={(e) =>
                                setToReverse(e.currentTarget.checked)
                            }
                            disabled={sequence == ""}
                        />
                        <Form.Check
                            type="switch"
                            id="complement-switch"
                            label="Complement"
                            checked={toComplement}
                            onChange={(e) =>
                                setToComplement(e.currentTarget.checked)
                            }
                            disabled={sequence == ""}
                        />
                    </Form>
                    <SequenceViewer
                        title={"Sequence"}
                        sequence={sequence}
                        setSequence={setSequence}
                        readonly={false}
                        onClick={clearSequence}
                    />
                    <SequenceViewer
                        title={"Output"}
                        sequence={output}
                        setSequence={setOutput}
                        readonly={true}
                        onClick={clearOutput}
                    />
                </div>
                {dataStats ? <PercentPlots dataStats={dataStats} /> : ""}
            </Card>
            <ModalBasic
                modalShow={modalShow}
                setModalShow={setModalShow}
                titleChild={
                    summary || fullDetail ? (
                        <span>{summary?.name || fullDetail?.entrez}</span>
                    ) : (
                        "Gene"
                    )
                }
                bodyChild={
                    <>
                        <InfoDetail
                            data={detail}
                            getFull={searchFullDetail}
                            getStats={handleClickStats}
                        />
                        {summary || fullDetail ? (
                            <InfoFullDetail
                                dataPlumber={fullDetail}
                                dataPublic={summary}
                            />
                        ) : (
                            ""
                        )}
                    </>
                }
            />
        </>
    );
}

export default SearchView;
