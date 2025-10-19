import { Card, Container } from "react-bootstrap";
import Header from "../Components/Header";
import ProteinViewer from "../Components/ProteinViewer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Searcher from "../Components/Searcher";
import img from "../assets/gene.png"

function ProteinView() {
    const location = useLocation();

    const { id } = location.state || {};
    const [input, setInput] = useState<string>("");
    const [pressButton, setPressButton] = useState<boolean>(false);

    const chain = id ? id.split("_")[1] : null;
    const pdbId = id ? id.split("_")[0] : null;

    console.log(" proteinview recibe --------------", location);
    console.log(" proteinview recibe -------------- ID", id);

    return (
        <Container fluid className="mt-3">
            <Header
                title="Proteina"
                text="3DMol."
                imageSrc={img}
            />
            <Card.Body>
                {pdbId ? (
                    <ProteinViewer chain={chain} pdbId={pdbId} />
                ) : (
                    <>
                        <Searcher
                            text={"PDB ID"}
                            input={input}
                            setInput={setInput}
                            onSubmit={() => setPressButton(true)}
                            placeholder={"Ej. 4Q0G"}
                        />
                        {input && pressButton ? (
                            <ProteinViewer pdbId={input} />
                        ) : (
                            ""
                        )}
                    </>
                )}
            </Card.Body>
        </Container>
    );
}

export default ProteinView;
