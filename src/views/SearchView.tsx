import { useEffect, useState, type FormEvent } from "react";
import { Button, Container, Form } from "react-bootstrap";
import SequenceViewer from "../Components/SequenceViewer";
import { GetSequenceByRange } from "../services/BioconductorServices";
import Header from "../Components/Header";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import type {
    DataDetail,
    DataSequence,
    DataStats,
} from "../types/DataPlumber";
import InputRange from "../Components/InputRange";
import DropdownChr from "../Components/DropdownChr";
import PercentPlots from "../Components/PercentPlots";
import { GetComplement } from "../services/PythonServices";
import type { Sequence } from "../types/DataPython";

type Props = {
    detail: DataDetail | null;
    setDetail: React.Dispatch<React.SetStateAction<DataDetail | null>>;
};

function SearchView({ detail, setDetail }: Props) {
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
    const [dataStats, setDataStats] = useState<DataStats | null>(null);

    useEffect(() => {
        handleReverseComplement();
    }, [toReverse, toComplement]);

    useEffect(() => {
        if (detail) {
            setSequence("");
            setDataStats(null);
            console.log("useEffect set entrez");
        }
    }, [detail]);

    //COMPLEMENT http://localhost:8081/api/Python/complement
    const handleReverseComplement = async () => {
        if (sequence != "") {
            const response: ResponsePlumber<Sequence> =
                await GetComplement(sequence, toReverse, toComplement);
            setOutput(response.data.sequence);
            console.log(response.data);
        }
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
        setDataStats(null);
        setDetail(null);
    };
    const clearOutput = () => {
        setToReverse(false);
        setToComplement(false);
        setOutput("");
    };

    return (
        <Container fluid className="mt-3">
            <Header
                title="Search"
                text="Gene"
                imageSrc="../../public/search-gene.png"
            />
{/* 
            <Searcher
                text={"Search"}
                input={input}
                setInput={setInput}
                onSubmit={() => alert(input)}
                disabled={input == ""}
                placeholder="Ingresa alias, symbol o entrez?"
            />
 */}
            {/* range */}
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

            {/* reverse complement */}
            <div className="mt-3  mx-3 pb-0">
                <Form className=" d-flex justify-content-start">
                    {" "}
                    <Form.Check
                        type="switch"
                        id="reverse-switch"
                        label="Reverse"
                        checked={toReverse}
                        onChange={(e) => setToReverse(e.currentTarget.checked)}
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
            </div>

            {/* textareas */}

            <div className=" mx-3 pb-0">
                <SequenceViewer
                    title={"Sequence"}
                    sequence={sequence}
                    setSequence={setSequence}
                    readonly={false}
                    onClick={clearSequence}
                />

                {output && <SequenceViewer
                    title={"Output"}
                    sequence={output}
                    setSequence={setOutput}
                    readonly={true}
                    onClick={clearOutput}
                />}
            </div>
            {dataStats ? <PercentPlots dataStats={dataStats} /> : ""}
        </Container>
    );
}

export default SearchView;
