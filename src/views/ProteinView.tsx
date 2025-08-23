import { Card } from "react-bootstrap";
import Header from "../Components/Header";

function ProteinView() {
    return (
        <Card className="p-3 my-3">
            <Header
                title="Proteina"
                text="3DMol."
                imageSrc="../../public/gene.png"
            />

            <div
                style={{height: "400px", width: "400px", position: "relative"}}
                className="viewer_3Dmoljs"
                data-pdb="2POR"
                data-backgroundcolor="0xffffff"
                data-style="stick"
                data-ui="true"
            ></div>
        </Card>
    );
}

export default ProteinView;
