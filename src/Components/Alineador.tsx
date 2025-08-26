import { Button, Form } from "react-bootstrap";
import type { ResponsePlumberAlign } from "../types/ResponsePlumberAlign";
import { GetAlign } from "../services/PlumberServices";
import { useState, type FormEvent } from "react";
import TextArea from "./TextArea";

interface Props {
    setAlign: React.Dispatch<React.SetStateAction<ResponsePlumberAlign | undefined>>;
}


function Alineador( {setAlign} : Props) {
    const [pattern, setPattern] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const global = true;

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response: ResponsePlumberAlign = await GetAlign(
            pattern,
            subject,
            global
        );
        setAlign(response);
        console.log(response);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <TextArea
                    title="Pattern"
                    sequence={pattern}
                    setSequence={setPattern}
                />
                <TextArea
                    title="Subject"
                    sequence={subject}
                    setSequence={setSubject}
                />
                <div className="d-flex justify-content-end">
                    <Button type="submit" variant="light">
                        Search
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default Alineador;
