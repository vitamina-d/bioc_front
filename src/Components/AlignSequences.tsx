import { Button } from "react-bootstrap";
import { GetAlign } from "../services/PlumberServices";
import { useState, type FormEvent } from "react";
import type { DataAlign, ResponsePlumber } from "../types/ResponsePlumber";
import DotPlot from "./Plots/DotPlot";
import SequenceViewer from "./SequenceViewer";

interface Props {
    setDataAlign: React.Dispatch<React.SetStateAction<DataAlign | undefined>>;
}

function AlignSequences({ setDataAlign }: Props) {
    const [pattern, setPattern] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const type: string = "global"; // "local" "overlap"
    const gapOpening: number = 1;
    const gapExtension: number = 2;

    const handleOnClick = async (event: FormEvent) => {
        event.preventDefault();
        console.log("ALINEAR pattern:", pattern, "subject:", subject, "type:", type);

        const response: ResponsePlumber<DataAlign> = await GetAlign(
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
                        clear={true}
                    />
                </div>
                <div className="flex-fill">
                    <SequenceViewer
                        sequence={subject}
                        title={"Subject"}
                        setSequence={setSubject}
                        readonly={false}
                        clear={true}
                    />
                </div>
            </div>
            <DotPlot pattern={pattern} subject={subject} />
        </>
    );
}

export default AlignSequences;
