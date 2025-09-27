import { Card } from "react-bootstrap";
import Header from "../Components/Header";
import ProteinViewer from "../Components/ProteinViewer";

function ProteinView() {
    return (
        <div className="row mx-1 ">
            <Header
                title="Proteina"
                text="3DMol."
                imageSrc="../../public/gene.png"
            />
            <Card.Body>
                <ProteinViewer pdbId="1P0C" />
                <ProteinViewer pdbId="2POR" />
            </Card.Body>
        </div>
    );
}

export default ProteinView;
