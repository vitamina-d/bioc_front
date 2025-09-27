import { Button, Card, Form } from "react-bootstrap";
import Header from "../Components/Header";
import type { BlastxReport } from "../types/DataBlastx";
import { useState, type FormEvent } from "react";
import BlastxTable from "../Components/BlastxTable";
import BlastxSearch from "../Components/BlastxSearch";
import SequenceViewer from "../Components/SequenceViewer";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import { PostBlastx } from "../services/BlastServices";

function BlastxView() {
    const [blastx, setBlastx] = useState<BlastxReport | null>(null);
    const [sequence, setSequence] = useState<string>("");

    const fetchData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("QUERY: ", sequence);
        const response: ResponsePlumber<BlastxReport> = await PostBlastx(
            sequence.trim()
        );
        setBlastx(response.data);
    };
    return (
        <div className="row mx-1 ">
            <Header
                title="Blastx"
                text="Hits"
                imageSrc="../../public/search-gene.png"
            />
            <SequenceViewer
                title={"Query"}
                sequence={sequence}
                setSequence={setSequence}
                readonly={false}
            />
            <Form onSubmit={fetchData}>
                <Form.Control
                    as="textarea"
                    rows={5}
                    value={sequence}
                    onChange={(e) => setSequence(e.target.value)}
                />
                <Button type="submit">blastx</Button>
            </Form>{" "}
            <BlastxSearch setBlastx={setBlastx} />
            <Card.Body>{blastx ? <BlastxTable data={blastx} /> : ""}</Card.Body>
        </div>
    );
}

export default BlastxView;
