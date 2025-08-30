import { Button } from "react-bootstrap";
import { GetAlign } from "../services/PlumberServices";
import { useState, type FormEvent } from "react";
import TextArea from "./TextArea";
import type { DataAlign, ResponsePlumber } from "../types/ResponsePlumber";
import DotPlot from "./Plots/DotPlot";

interface Props {
    setAlign: React.Dispatch<
        React.SetStateAction<ResponsePlumber<DataAlign> | undefined>
    >;
}

function AlignSequences({ setAlign }: Props) {
    const [pattern, setPattern] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const type: string = "global"; // "local" "overlap"
    const gapOpening: number = -1;
    const gapExtension: number = -2;

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log("ALINEAR");
        console.log("pattern:", pattern, "subject:", subject, "type:", type);

        const response: ResponsePlumber<DataAlign> = await GetAlign(
            //body
            pattern,
            subject,
            type,
            gapOpening,
            gapExtension
        );
        setAlign(response);
        console.log(response.data);
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <TextArea
                    title="Pattern"
                    sequence={pattern}
                    setSequence={setPattern}
                />
                <TextArea
                    title="Subject"
                    sequence={subject}
                    setSequence={setSubject}
                />
            <DotPlot pattern={pattern} subject={subject} />
            </div>

            <div className="d-flex justify-content-end">
                <Button onClick={handleSubmit} variant="light">
                    Search
                </Button>
            </div>
        </>
    );
}

export default AlignSequences;
