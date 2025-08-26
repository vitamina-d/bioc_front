import { Form, InputGroup } from "react-bootstrap";

type Props = {
    title: string;
    sequence: string;
    setSequence: React.Dispatch<React.SetStateAction<string>>;
};

function TextArea({ title, sequence, setSequence }: Props) {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>{title}</InputGroup.Text>
            <Form.Control
                className="py-1 px-2"
                as="textarea"
                rows={5}
                size="sm"
                value={sequence.toLocaleUpperCase()}
                onChange={(e) => setSequence(e.target.value)}
            />
        </InputGroup>
    );
}

export default TextArea;

