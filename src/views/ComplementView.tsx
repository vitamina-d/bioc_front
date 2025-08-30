import { Card } from "react-bootstrap";
import Header from "../Components/Header";
import ComplementSequences from "../Components/ComplementSequences";

function ComplementView() {
    return (
        <Card className="p-3 my-3 ">
            <Header
                title="Complemento"
                text="reverse-complement."
                imageSrc="../../public/gene.png"
            />
            <ComplementSequences />
            
        </Card>
    );
}

export default ComplementView;
