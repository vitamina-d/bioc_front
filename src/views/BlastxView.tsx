import { Button, Card, Container, Form } from "react-bootstrap";
import Header from "../Components/Header";
import type { BlastxReport, Hit } from "../types/DataBlastx";
import { useState, type FormEvent } from "react";
import BlastxTable from "../Components/BlastxTable";
import SequenceViewer from "../Components/SequenceViewer";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import { PostBlastx } from "../services/BlastServices";
import ModalBasic from "../Components/ModalBasic";
import TextArea from "../Components/TextArea";
import { GetTranslate } from "../services/PythonServices";
import type { Sequence } from "../types/DataPython";
import img from "../assets/search-gene.png"

function BlastxView() {
    const [blastx, setBlastx] = useState<BlastxReport | null>(null);
    const [sequence, setSequence] = useState<string>("");
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [modificable, setModificable] = useState<boolean>(true);
    const [frame, setFrame] = useState<number | null>(null);
    const [protein, setProtein] = useState<string>("");

    const fetchData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("QUERY: ", sequence);
        const response: ResponsePlumber<BlastxReport> = await PostBlastx(
            sequence.trim()
        );
        console.log(response);
        setBlastx(response.data);
        setModificable(false);
        setModalShow(true);
    };
    const clearInput = () => {
        setModificable(true);
        setSequence("");
        setFrame(null);
        setProtein("")
    }

    const handleCompare = async (frame: number) => {
        setModalShow(false);
        setFrame(frame);
        const response: ResponsePlumber<Sequence> = await GetTranslate(sequence.trim(), frame);
        setProtein(response.data.sequence)
        //mostrar la traduccion y el frame 

        //navigate("/", { state: { hit, query } })

    }
    const fetchPrediction = async (event: FormEvent) => {
        event.preventDefault();
        alert("INIT JOB")

    }

    return (
        <Container fluid className="mt-3 ">
            <Header
                title="blastx"
                text="Ingrese una secuencia de nucleotidos. blastx traduce y compara contra una base de datos de proteínas."
                imageSrc={img}
            />
            <Form onSubmit={fetchData}>
                <SequenceViewer
                    title={"Query"}
                    sequence={sequence}
                    setSequence={setSequence}
                    readonly={!modificable}
                    onClick={clearInput}
                >
                    <div className="d-flex justify-content-end">
                        {modificable ? 
                        <Button variant="secondary" size={"sm"} type="submit">
                            get hits
                        </Button>
                        :
                        <Button variant="secondary" size={"sm"} onClick={() => setModalShow(true)}>
                            show hits
                        </Button>
                        }
                    </div>
                </SequenceViewer>
            </Form>
            
            <ModalBasic modalShow={modalShow} setModalShow={setModalShow} size={"xl"} title={"Result blastx"}>
                <Card.Body>
                    {blastx ? <BlastxTable data={blastx} handleCompare={handleCompare} /> : ""}
                </Card.Body>
            </ModalBasic>
            {/*<BlastxSearch setBlastx={setBlastx} />*/}
            
            {frame != null ? 
            <>
                <p>FRAME: {frame}</p>
                <TextArea title={"Protein"} rows={2} sequence={protein}></TextArea>

                <Form onSubmit={fetchPrediction}>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" size={"sm"} type="submit" >
                            get prediction
                        </Button>
                    </div>
                </Form>
            </> 
            : "" }
        </Container>
    );
}

export default BlastxView;
