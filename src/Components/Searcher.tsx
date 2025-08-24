import type { FormEventHandler } from "react";
import { Button, Form } from "react-bootstrap";

interface SearcherProps {
    text: string;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    onClick: FormEventHandler;
}

function Searcher({ text, input, setInput, onClick }: SearcherProps) {
    return (
        <Form onSubmit={(e) => onClick(e)}>
            <div className="input-group mb-3 w-auto">
                <label className="input-group-text">INPUT</label>
                <input
                    type="string"
                    className="form-control"
                    id="inputEntrez"
                    value={input}
                    placeholder="Ingresa alias, symbol o entrez"
                    onChange={(e) => setInput(e.target.value)}
                />
                <label className="input-group-text p-0">
                    <Button variant="light" className="bg-light" type="submit">
                        {text}
                    </Button>
                </label>
            </div>
        </Form>
    );
}

export default Searcher;
