import { Card, Container } from "react-bootstrap";
import Header from "../Components/Header";
import ProteinViewer from "../Components/ProteinViewer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Searcher from "../Components/Searcher";
import img from "../assets/gene.png";
import { GetAlignPrediction } from "../services/FoldingServices";

function ProteinView() {
    const location = useLocation();
    const { jobId, rank, pdbId } = location.state || {};

    const [input, setInput] = useState<string>("");
    const [pressButton, setPressButton] = useState<boolean>(false);
    const [pdbString, setPdbString] = useState<string>("");

    console.log(" proteinview recibe --------------", location);
    console.log(" proteinview recibe -------------- ID", jobId, rank, pdbId);

    useEffect(() => {
        //onClick del button rank seleccionado para visualizar la estructura
        const handlePrediction = async () => {
            //job/{jobId}/rank_{rank}/align/{pdbId}
            console.log(
                "ALIGN: jobid ",
                jobId,
                ", rank: ",
                rank,
                "pdbId: ",
                pdbId
            );
            const align: string = await GetAlignPrediction(
                "68e17d82e986d44f8b7e9e1b",
                rank,
                pdbId
            );
            console.log(align);
            setPdbString(align);
        };
        handlePrediction();
    }, [location]);

    return (
        <Container fluid className="mt-3">
            <Header title="Proteina" text="3DMol." imageSrc={img} />
            <Card.Body>
                {pdbId && pdbString ? (
                    <ProteinViewer pdbId={pdbId} prediction={pdbString} />
                ) : (
                    <>
                        <Searcher
                            text={"PDB ID"}
                            input={input}
                            setInput={setInput}
                            onSubmit={() => setPressButton(true)}
                            placeholder={"4Q0G"}
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
