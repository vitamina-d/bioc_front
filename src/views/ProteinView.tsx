import { Card } from "react-bootstrap";
import Header from "../Components/Header";
import ProteinViewer from "../Components/ProteinViewer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Searcher from "../Components/Searcher";

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
        <div className="row mx-1 ">
            <Header
                title="Proteina"
                text="3DMol."
                imageSrc="../../public/gene.png"
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
        </div>
    );
}

export default ProteinView;
