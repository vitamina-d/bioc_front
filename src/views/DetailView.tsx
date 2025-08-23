import { Card } from "react-bootstrap";
import Detail from "../Components/Detail";
import Header from "../Components/Header";

function DetailView() {
    return (
        <Card className="p-3 my-3 ">
            <Header
                title="Detalle"
                text="Ingrese entrez o symbol."
                imageSrc="../../public/gene.png"
            />
            <Card.Body>
                <Detail />
            </Card.Body>
        </Card>
    );
}

export default DetailView;
