import { Button } from "react-bootstrap";
import { GetAlign } from "../services/PlumberServices";
import { useState, type FormEvent } from "react";
import type { Response } from "../types/Response";
import DotPlot from "./Plots/DotPlot";
import SequenceViewer from "./SequenceViewer";
import type { DataAlign } from "../types/DataPlumber";

type Props = {
    setDataAlign: React.Dispatch<React.SetStateAction<DataAlign | undefined>>;
};

function AlignSequences({ setDataAlign }: Props) {
    const [pattern, setPattern] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const type: string = "global"; // "local" "overlap"
    const gapOpening: number = 1;
    const gapExtension: number = 1;

    const handleOnClick = async (event: FormEvent) => {
        event.preventDefault();
        console.log(
            "ALINEAR pattern:",
            pattern,
            "subject:",
            subject,
            "type:",
            type
        );

        const response: Response<DataAlign> = await GetAlign(
            //body
            pattern,
            subject,
            type,
            gapOpening,
            gapExtension
        );
        console.log(response);
        setDataAlign(response.data);
    };
    const clearPattern = () => {
        setPattern("");
    };
    const clearSubject = () => {
        setSubject("");
    };
    return (
        <>
            <div className="d-flex justify-content-end">
                <Button
                    onClick={handleOnClick}
                    size="sm"
                    variant="outline-dark"
                    className="mb-2"
                >
                    ALIGN
                </Button>
            </div>
            <div className="d-flex gap-3">
                <div className="flex-fill">
                    <SequenceViewer
                        sequence={pattern}
                        title={"Pattern"}
                        setSequence={setPattern}
                        readonly={false}
                        onClick={clearPattern}
                    />
                </div>
                <div className="flex-fill">
                    <SequenceViewer
                        sequence={subject}
                        title={"Subject"}
                        setSequence={setSubject}
                        readonly={false}
                        onClick={clearSubject}
                    />
                </div>
            </div>
            <DotPlot pattern={pattern} subject={subject} maxLenght={100} />
        </>
    );
}

export default AlignSequences;
