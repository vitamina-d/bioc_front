import { Button, Card, Container, Form } from "react-bootstrap";
import Header from "../Components/Header";
import type { BlastxReport } from "../types/DataBlastx";
import { useState, type FormEvent } from "react";
import BlastxTable from "../Components/BlastxTable";
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
        console.log(response);
        setBlastx(response.data);
    };
    return (
        <Container fluid className="mt-3">
            <Header
                title="Blastx"
                text="Hits"
                imageSrc="../../public/search-gene.png"
            />
            <Form onSubmit={fetchData}>
                <SequenceViewer
                    title={"Query"}
                    sequence={sequence}
                    setSequence={setSequence}
                    readonly={false}
                >
                    <div className="d-flex justify-content-end">
                        <Button size={"sm"} type="submit">
                            blastx
                        </Button>
                    </div>
                </SequenceViewer>
            </Form>
            {/*<BlastxSearch setBlastx={setBlastx} />*/}
            <Card.Body>{blastx ? <BlastxTable data={blastx} /> : ""}</Card.Body>
        </Container>
    );
}

export default BlastxView;
