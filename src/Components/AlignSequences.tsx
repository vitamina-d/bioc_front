import { Button } from "react-bootstrap";
import { GetAlign } from "../services/PlumberServices";
import { useState, type FormEvent } from "react";
import TextArea from "./TextArea";
import type { DataAlign, ResponsePlumber } from "../types/ResponsePlumber";

interface Props {
    setAlign: React.Dispatch<
        React.SetStateAction<ResponsePlumber<DataAlign> | undefined>
    >;
}

function AlignSequences({ setAlign }: Props) {
    const [pattern, setPattern] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const type = "global"; // "local" "overlap"
    const gapOpening = -1;
    const gapExtension = -2;

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response: ResponsePlumber<DataAlign> = await GetAlign(
            //body
            pattern,
            subject,
            type,
            gapOpening,
            gapExtension
        );
        setAlign(response);
        console.log(response);
    };

    return (
        <>
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
            <div className="d-flex justify-content-end">
                <Button onClick={handleSubmit} variant="light">
                    Search
                </Button>
            </div>
        </>
    );
}

export default AlignSequences;
