import { Button, Card, Col, Row } from "react-bootstrap";
import Header from "../Components/Header";
import { PostBlastx } from "../services/BlastServices";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import type { BlastxReport } from "../types/DataBlastx";

function AboutView() {
    const fetchData = async () => {
        const response: ResponsePlumber<BlastxReport> = await PostBlastx("ACGT");
        console.log(response);
    };

    return (
        <Card className="p-3 my-3">
            <Header
                title="v i t a m i n a"
                text="Tema: Aplicación web para el análisis de datos genómicos relacionados con la Vitamina D, su estudio y caracterización."
                imageSrc="../../public/gene.png"
            />
            <Card.Body>
                <Row>
                    <Col>1 of 2</Col>
                    <Col>1 of 2</Col>
                </Row>
                <Row>
                    <Col>1 of 2</Col>
                    <Col>1 of 2</Col>
                    <Col>1 of 2</Col>
                </Row>
                <Button onClick={fetchData}></Button>
            </Card.Body>
        </Card>
    );
}

export default AboutView;
