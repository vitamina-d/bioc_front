import { Button, Card, Container } from "react-bootstrap";
import Header from "../Components/Header";
import ProteinViewer from "../Components/ProteinViewer";
import { useState } from "react";
import Searcher from "../Components/Searcher";
import img from "../assets/gene.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";

function ProteinView() {
    const { showToast } = useToastContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [input, setInput] = useState<string>("");
    const [pressButton, setPressButton] = useState<boolean>(false);
    const namePage: string = location.pathname;
    if (namePage == "/") {
        navigate("/protein");
    }

    const handleClick = () => {
        showToast("click", "primary");
    };
    
    return (
        <Container fluid className="mt-3">
            <Header title="Proteina" text="3DMol." imageSrc={img} />
            <>
                <Searcher
                    text={"PDB ID"}
                    input={input}
                    setInput={setInput}
                    onSubmit={() => setPressButton(true)}
                    placeholder={"4Q0G"}
                />
                {input && pressButton ? (
                    <Card  className="mx-3">
                        <ProteinViewer pdbId={input} />
                    </Card>
                ) : (
                    ""
                )}
                <Button onClick={handleClick}>TOAST</Button>
            </>
        </Container>
    );
}

export default ProteinView;
