import TextArea from "./TextArea";
import ButtonOverlay from "./ButtonOverlay";
import { Stack, type ButtonProps } from "react-bootstrap";
import type { ChangeEvent } from "react";

type Props = {
    title: string;
    sequence: string;
    setSequence: React.Dispatch<React.SetStateAction<string>>;
    readonly: boolean;
} & ButtonProps;

function SequenceViewer({
    title,
    sequence,
    setSequence,
    readonly,
    ...prop
}: Props) {
    const copySequence = () => {
        navigator.clipboard.writeText(sequence);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setSequence(text);
            };
        }
    };

    return (
        <Stack className="d-flex flex-column">
            <TextArea
                title={title}
                sequence={sequence}
                readOnly={readonly}
                rows={4}
                setSequence={setSequence}
            />
            <Stack
                direction="horizontal"
                gap={2}
                className="d-flex justify-content-between pb-2"
            >
                <input type="file" accept=".fasta" onChange={handleFileChange} />
                <div className="d-flex justify-content-end"
>
                    <ButtonOverlay
                        textHover={"Copy"}
                        sequence={sequence}
                        onClick={copySequence}
                        typeIcon={"copy"}
                        size="sm"
                        variant="outline-secondary"
                    />
                    <ButtonOverlay
                        textHover={"Clear"}
                        typeIcon="backspace"
                        size="sm"
                        variant="outline-secondary"
                        {...prop}
                        />
                </div>
            </Stack>
        </Stack>
    );
}

export default SequenceViewer;
