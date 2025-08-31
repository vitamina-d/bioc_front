import { Form, InputGroup } from "react-bootstrap";

type Props = {
    title: string;
    rows: number;
    sequence: string;
    setSequence?: React.Dispatch<React.SetStateAction<string>>;
    readOnly?: boolean;
};

function TextArea({ title, rows, sequence, setSequence, readOnly }: Props) {
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
