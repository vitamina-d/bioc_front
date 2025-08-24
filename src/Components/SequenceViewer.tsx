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
        <div className="rounded my-3">
            {sequence && (
                <>
                    <pre
                        className="p-3 border rounded overflow-auto"
                        style={{ maxHeight: "300px" }}
                    >
                        {sequence}
                    </pre>
                    <Button size="sm" variant="dark" onClick={copySequence}>
                        Copy
                    </Button>
                </>
            )}
        </div>
    );
}

export default SequenceViewer;
