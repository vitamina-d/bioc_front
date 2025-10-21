import { Button, Form } from "react-bootstrap";
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
        <div className="row mx-1 ">
            <Form onSubmit={handleSubmit}>
                <div className="input-group mb-3 w-auto">
                    <label className="input-group-text">INPUT</label>
                    <input
                        type="string"
                        className="form-control"
                        id="inputEntrez"
                        value={input}
                        placeholder={placeholder}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <label className="input-group-text p-0">
                        <Button
                            variant="light"
                            type="submit"
                            className="rounded-0"
                            {...prop}
                        >
                            {text}
                        </Button>
                    </label>
                </div>
            </Form>
        </div>
    );
}

export default Searcher;
