import { Button, Form } from "react-bootstrap";
import { GetComplement } from "../services/BioconductorServices";
import { useEffect, useState } from "react";
import type {
    ResponsePlumber,
} from "../types/ResponsePlumber";
import SequenceViewer from "./SequenceViewer";
import type { DataComplement } from "../types/DataPlumber";

function ComplementSequences() {
    const [sequence, setSequence] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [toReverse, setToReverse] = useState(false);
    const [toComplement, setToComplement] = useState(false);

    useEffect(() => {
        handleReverseComplement();
    }, [toReverse, toComplement]);

    const handleReverseComplement = async () => {
        console.log("handleReverseComplement")
        const response: ResponsePlumber<DataComplement> =
            await GetComplement(
                //body
                sequence,
                toReverse,
                toComplement
            );
        setOutput(response.data.sequence);
        console.log(response.data);
    };

    //console.log("toReverse: ", toReverse, ". toComplement: ", toComplement);

    return (
        <>
            <div className="d-flex justify-content-end mb-2">
                <Form>
                    {" "}
                    <Form.Check
                        type="switch"
                        id="reverse-switch"
                        label="Reverse"
                        checked={toReverse}
                        onChange={(e) => setToReverse(e.currentTarget.checked)}
                    />
                    <Form.Check
                        type="switch"
                        id="complement-switch"
                        label="Complement"
                        checked={toComplement}
                        onChange={(e) =>
                            setToComplement(e.currentTarget.checked)
                        }
                    />
                </Form>
            </div>
            <div className="d-flex justify-content-between">
                <div className="flex-fill me-2">
                    <SequenceViewer
                        sequence={sequence}
                        title={"Sequence"}
                        setSequence={setSequence}
                        readonly={false}
                        onClick={() => {
                            setOutput("");
                            setSequence("");
                        }}
                    />
                </div>
                <div className="flex-fill ms-2">
                    <SequenceViewer
                        sequence={output}
                        title={"Output"}
                        setSequence={setOutput}
                        readonly={true}
                        onClick={() => setSequence("")}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <Button onClick={handleReverseComplement} variant="light">
                    GET
                </Button>
            </div>
        </>
    );
}

export default ComplementSequences;
