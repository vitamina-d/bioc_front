import TextArea from "./TextArea";
import ButtonOverlay from "./ButtonOverlay";
import { Stack, type ButtonProps } from "react-bootstrap";

type Props = {
    title: string;
    sequence: string;
    setSequence?: React.Dispatch<React.SetStateAction<string>>;
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
                className="justify-content-end pb-2"
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
            </Stack>
        </Stack>
    );
}

export default SequenceViewer;
