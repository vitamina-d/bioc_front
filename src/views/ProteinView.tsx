import { Card } from "react-bootstrap";
import Header from "../Components/Header";
import ProteinViewer from "../Components/ProteinViewer";
import { useLocation } from "react-router-dom";

function ProteinView() {
    const location = useLocation();

    const { id } = location.state || {}; 
    const chain: string = id.split("_")[1];
    const pdbId: string = id.split("_")[0];

        console.log(" proteinview recibe --------------", location)
        console.log(" proteinview recibe -------------- ID", id)

    return (
        <div className="row mx-1 ">
            <Header
                title="Proteina"
                text="3DMol."
                imageSrc="../../public/gene.png"
            />
            <Card.Body>
                <ProteinViewer pdbId={pdbId} />
                <ProteinViewer pdbId="2POR" />
            </Card.Body>
        </div>
    );
}

export default ProteinView;
