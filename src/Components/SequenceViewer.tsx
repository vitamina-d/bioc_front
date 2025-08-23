import { Button } from "react-bootstrap";

type Props = {
    sequence: string;
};

function SequenceViewer({ sequence }: Props) {
    const copySequence = () => {
        navigator.clipboard.writeText(sequence);
        console.log("copied: " + sequence);
    };
    return (
        <div className="  rounded my-3">
            {sequence && (
                <>
                    <pre
                        className="my-3 p-3 bg- border rounded overflow-auto"
                        style={{ maxHeight: "300px" }}
                    >
                        {sequence}
                    </pre>
                    <Button size="sm" onClick={copySequence}>
                        Copy Sequence
                    </Button>
                </>
            )}
        </div>
    );
}

export default SequenceViewer;
