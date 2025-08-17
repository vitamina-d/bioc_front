import { Card } from "react-bootstrap";
import Header from "../Components/Header";

function Sequence() {
    return (
        <Card className="p-3 my-3">
            <Header
                title="Obtener secuencia"
                text="subtitle."
                imageSrc="../../public/gene.png"
            />
        </Card>
    );
}

export default Sequence;
