import { Button, Card, Container, Form } from "react-bootstrap";
import Header from "../Components/Header";
import type { BlastxReport } from "../types/DataBlastx";
import { useState, type FormEvent } from "react";
import BlastxTable from "../Components/BlastxTable";
import SequenceViewer from "../Components/SequenceViewer";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import { PostBlastx } from "../services/BlastServices";
import ModalBasic from "../Components/ModalBasic";

function BlastxView() {
    const [blastx, setBlastx] = useState<BlastxReport | null>(null);
    const [sequence, setSequence] = useState<string>("");
    const [modalShow, setModalShow] = useState<boolean>(false);
    
    const fetchData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("QUERY: ", sequence);
        const response: ResponsePlumber<BlastxReport> = await PostBlastx(
            sequence.trim()
        );
        console.log(response);
        setBlastx(response.data);
        setModalShow(true);
    };

    return (
        <Container fluid className="mt-3 ">
            <Header
                title="blastx"
                text="Ingrese una secuencia de nucleotidos. blastx traduce y compara contra una base de datos de proteínas."
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
                        <Button variant="secondary" size={"sm"} type="submit">
                            get hits
                        </Button>
                    </div>
                </SequenceViewer>
            </Form>
            
            <ModalBasic modalShow={modalShow} setModalShow={setModalShow} size={"xl"} title={"Result blastx"}>
                <Card.Body>
                    {blastx ? <BlastxTable data={blastx} /> : ""}
                </Card.Body>
            </ModalBasic>
            {/*<BlastxSearch setBlastx={setBlastx} />*/}
            
        </Container>
    );
}

export default BlastxView;
