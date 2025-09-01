import TextArea from "./TextArea";
import ButtonOverlay from "./ButtonOverlay";
import type { ButtonProps } from "react-bootstrap";

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
        <div className="d-flex flex-column">
            <TextArea
                title={title}
                sequence={sequence}
                readOnly={readonly}
                rows={4}
                setSequence={setSequence}
            />
            <div className="d-flex justify-content-end">
                <ButtonOverlay
                    textHover={"Copy"}
                    sequence={sequence}
                    onClick={copySequence}
                    typeIcon={"copy"}
                    size="sm"
                    variant="outline-dark"
                />
                <ButtonOverlay
                    textHover={"Clear"}
                    typeIcon="backspace"
                    size="sm"
                    variant="outline-dark"
                    {...prop}
                />
            </div>
        </div>
    );
}

export default SequenceViewer;
