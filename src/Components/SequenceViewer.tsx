import { Button, Card } from "react-bootstrap";
import type { DataPlumberSequence } from "../types/ResponsePlumberSequence";

type Props = {
    data: DataPlumberSequence;
};

function SequenceViewer({ data }: Props) {
    const copySequence = () => {
        navigator.clipboard.writeText(data.sequence);
        console.log("copied: " + data);
    };

    return (
        data && (
            <div className=" mx-3">
                <pre
                    className="p-3 border rounded overflow-auto"
                    style={{ overflowY: "auto" }}
                >
                    {data.sequence}
                </pre>
                <div className="d-flex justify-content-between">
                    <Button size="sm" variant="dark" onClick={copySequence}>
                        Copy
                    </Button>
                    <Card.Text className="small fw-bold">
                        Lenght: {data.sequence_length}
                    </Card.Text>
                </div>
            </div>
        )
    );
}

export default SequenceViewer;
