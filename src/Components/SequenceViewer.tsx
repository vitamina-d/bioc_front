import TextArea from "./TextArea";
import ButtonOverlay from "./ButtonOverlay";

type Props = {
    title: string;
    sequence: string;
    setSequence?: React.Dispatch<React.SetStateAction<string>>;
    readonly: boolean;
    clear: boolean;
};

function SequenceViewer({
    title,
    sequence,
    setSequence,
    readonly,
    clear,
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
                {clear&&setSequence ? (
                    <ButtonOverlay
                        textHover={"Clear"}
                        onClick={() => setSequence("")}
                        typeIcon="backspace"
                        size="sm"
                        variant="outline-dark"
                    />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default SequenceViewer;
