/*import { Button, Form, InputGroup, Row } from "react-bootstrap";
import type { ButtonProps } from "react-bootstrap";

type SearcherProps = {
    text: string;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: () => void;
    placeholder: string;
} & ButtonProps;

function Searcher({
    text,
    input,
    setInput,
    onSubmit,
    placeholder,
    ...prop
}: SearcherProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <Row className="mx-1">
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3 w-auto">
                    <InputGroup.Text>INPUT </InputGroup.Text>
                    <Form.Control
                        type="string"
                        className="form-control"
                        id="inputEntrez"
                        value={input}
                        placeholder={placeholder}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <InputGroup.Text>
                        <Button
                            variant="light"
                            type="submit"
                            className="rounded-0 p-0"
                            {...prop}
                        >
                            {text}
                        </Button>{" "}
                    </InputGroup.Text>
                </InputGroup>
            </Form>
        </Row>
    );
}

export default Searcher;
*/