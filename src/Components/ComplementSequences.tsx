import { Button, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { GetComplement } from "../services/PlumberServices";
import { useState, type FormEvent } from "react";
import TextArea from "./TextArea";
import type { DataComplement, ResponsePlumber } from "../types/ResponsePlumber";

function ComplementSequences() {
    const [sequence, setSequence] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [toReverse, setToReverse] = useState(false);
    const [toComplement, setToComplement] = useState(false);

    const handleOnClick = async (event: FormEvent) => {
        event.preventDefault();

        const response: ResponsePlumber<DataComplement> = await GetComplement(
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
                <ToggleButtonGroup type="checkbox">
                    <ToggleButton
                        id="tbg-check-1"
                        value={1}
                        variant={toReverse ? "success" : "secondary"}
                        size="sm"
                        checked={toReverse}
                        onChange={(e) => setToReverse(e.currentTarget.checked)}
                        className={toReverse ? "" : "border"}
                    >
                        Reverse
                    </ToggleButton>
                    <ToggleButton
                        id="tbg-check-2"
                        value={2}
                        variant={toComplement ? "success" : "secondary"}
                        size="sm"
                        checked={toComplement}
                        onChange={(e) =>
                            setToComplement(e.currentTarget.checked)
                        }
                        className={toComplement ? "" : "border"}
                    >
                        Complement
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="d-flex justify-content-between">
                <div className="flex-fill me-2">
                    {" "}
                    <TextArea
                        title="Sequence"
                        sequence={sequence}
                        setSequence={setSequence}
                    />
                </div>
                <div className="flex-fill ms-2">
                    {" "}
                    <TextArea
                        title="Output"
                        sequence={output}
                        readOnly={true}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <Button onClick={handleOnClick} variant="light">
                    GET
                </Button>
            </div>
        </>
    );
}

export default ComplementSequences;
