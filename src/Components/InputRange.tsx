import type { ReactNode } from "react";
import { Form, InputGroup } from "react-bootstrap";

type Props = {
    children: ReactNode;
    number: string;
    setNumber: React.Dispatch<React.SetStateAction<string>>;
};

function InputRange({ children, number, setNumber }: Props) {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>{children}</InputGroup.Text>
            <Form.Control
                type="text"
                placeholder={number}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
        </InputGroup>
    );
}

export default InputRange;
