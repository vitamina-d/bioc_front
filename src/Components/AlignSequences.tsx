import { Button } from "react-bootstrap";
import { GetAlign } from "../services/PlumberServices";
import { useState, type FormEvent } from "react";
import type { Response } from "../types/Response";
import DotPlot from "./Plots/DotPlot";
import SequenceViewer from "./SequenceViewer";
import type { DataAlign } from "../types/DataPlumber";
import { useToastContext } from "../context/ToastContext";
import { useSpinnerContext } from "../context/SpinnerContext";
import { validateNucleotides } from "../utils/validateNucleotides";

type Props = {
    setDataAlign: React.Dispatch<React.SetStateAction<DataAlign | undefined>>;
};

function AlignSequences({ setDataAlign }: Props) {
    const { showToast } = useToastContext();
    const { showSpinner, hideSpinner } = useSpinnerContext();

    const [pattern, setPattern] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [namePattern, setNamePattern] = useState<string>("");
    const [nameSubject, setNameSubject] = useState<string>("");

    const type: string = "global"; // "local" "overlap"
    const gapOpening: number = 1;
    const gapExtension: number = 1;

    const handleOnClick = async (event: FormEvent) => {
        event.preventDefault();

        showSpinner();

        if (!validateNucleotides(pattern)) {
            hideSpinner();
            showToast("Ingrese un pattern valido.", "Warning", "warning");
            return;
        }
        if (!validateNucleotides(subject)) {
            hideSpinner();
            showToast("Ingrese un subject valido.", "Warning", "warning");
            return;
        }
        const response: Response<DataAlign> | null = await GetAlign(
            //body
            pattern,
            subject,
            type,
            gapOpening,
            gapExtension,
            showToast
        );
        if (!response || !response.data) {
            hideSpinner();
            return;
        }
        hideSpinner();
        console.log(response);
        setDataAlign(response.data);
    };
    const clearPattern = () => {
        setNamePattern("");
        setPattern("");
    };
    const clearSubject = () => {
        setNameSubject("");
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
                        name={namePattern}
                        setName={setNamePattern}
                    />
                </div>
                <div className="flex-fill">
                    <SequenceViewer
                        sequence={subject}
                        title={"Subject"}
                        setSequence={setSubject}
                        readonly={false}
                        onClick={clearSubject}
                        name={nameSubject}
                        setName={setNameSubject}
                    />
                </div>
            </div>
            <DotPlot pattern={pattern} subject={subject} maxLenght={100} />
        </>
    );
}

export default AlignSequences;
