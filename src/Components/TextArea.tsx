import { Form, InputGroup } from "react-bootstrap";

type Props = {
    title: string;
    sequence: string;
    setSequence?: React.Dispatch<React.SetStateAction<string>>;
    readOnly?: boolean;
};

function TextArea({
    title,
    sequence,
    setSequence,
    readOnly = false,
}: Props) {

    let rows = 6;
    const lineCount = sequence.split("\n").length;
    console.log("lineCount", lineCount)
    if (lineCount == 1) {
        rows =  Math.min(sequence.length / 200, 15);
    } else {
        rows = Math.min(Math.max(lineCount, 6), 15);
    } 

    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>{title}</InputGroup.Text>
            <Form.Control
                className="py-1 px-2 font-monospace" // bg-light
                as="textarea"
                rows={rows}
                size="sm"
                value={sequence.toUpperCase()}
                readOnly={readOnly}
                onChange={
                    readOnly || !setSequence
                        ? undefined
                        : (e) => setSequence(e.target.value)
                }
            />
        </InputGroup>
    );
}

export default TextArea;
