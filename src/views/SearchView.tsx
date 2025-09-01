import { useEffect, useState, type FormEvent } from "react";
import { Button, Card, Dropdown, Form } from "react-bootstrap";
import SequenceViewer from "../Components/SequenceViewer";
import { GetComplement, GetSequenceByRange } from "../services/PlumberServices";
import Header from "../Components/Header";
import type {
    DataComplement,
    DataSequence,
    ResponsePlumber,
} from "../types/ResponsePlumber";
import Searcher from "../Components/Searcher";
import InputRange from "../Components/InputRange";
import { optionsChromosomes } from "../const/optionsChromosomes";

function SearchView() {
    //RANGE
    const [start, setStart] = useState("100000");
    const [end, setEnd] = useState("100100");
    const [chr, setChr] = useState<string>("");
    const [sequence, setSequence] = useState<string>("");

    //SEARCH
    const [input, setInput] = useState("");

    /// COMPLEMENT
    const [output, setOutput] = useState<string>("");
    const [toReverse, setToReverse] = useState(false);
    const [toComplement, setToComplement] = useState(false);

    ///OPTION

    useEffect(() => {
        handleReverseComplement();
    }, [toReverse, toComplement]);

    const handleReverseComplement = async () => {
        if (sequence != "") {
            const response: ResponsePlumber<DataComplement> =
                await GetComplement(sequence, toReverse, toComplement);
            setOutput(response.data.sequence);
            console.log(response.data);
        }
    };

    const submitSearch = async (event: FormEvent) => {
        event.preventDefault();
        alert(input);
    };
    const submitRange = async (event: FormEvent) => {
        event.preventDefault();

        console.log("PLUMBER: chr:", chr, "start", start, "end", end);

        const response: ResponsePlumber<DataSequence> =
            await GetSequenceByRange(chr, parseInt(start), parseInt(end));

        console.log(response);
        setSequence(response.data.sequence);
    };

    //clear
    const onClickSequence = () => {
        setToReverse(false);
        setToComplement(false);
        setOutput("");
        setSequence("");
    };
    const onClickOutput = () => {
        setToReverse(false);
        setToComplement(false);
        setOutput("");
    };

    return (
        <Card className="p-3 my-3 ">
            <Header
                title="Searcher"
                text="Ingrese la fuente, cromosoma y rango para consultar la secuencia."
                imageSrc="../../public/gene.png"
            />
            <Searcher
                text={"Search"}
                input={input}
                setInput={setInput}
                onSubmit={submitSearch}
                disabled={sequence == ""}
            />

            <Form onSubmit={submitRange}>
                <div className="row mx-1 ">
                    <div className="col">
                        <div className="input-group">
                            <label className="input-group-text ">
                                Chromosome
                            </label>
                            <Dropdown className="border rounded-end  w-auto">
                                <Dropdown.Toggle
                                    variant="light"
                                    id="dropdown-chr"
                                    className="w-auto"
                                >
                                    {chr ? `Chr${chr}` : ""}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {optionsChromosomes.map((opt) => (
                                        <Dropdown.Item
                                            key={opt.value}
                                            onClick={() => setChr(opt.value)}
                                        >
                                            {opt.label}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
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

            <div className=" mx-3 pb-3 pt-3 ">
                <Form>
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
                <SequenceViewer
                    sequence={sequence}
                    title={"Sequence"}
                    setSequence={setSequence}
                    readonly={false}
                    onClick={onClickSequence}
                />
                <SequenceViewer
                    sequence={output}
                    title={"Output"}
                    setSequence={setOutput}
                    readonly={true}
                    onClick={onClickOutput}
                />
            </div>
        </Card>
    );
}

export default SearchView;
