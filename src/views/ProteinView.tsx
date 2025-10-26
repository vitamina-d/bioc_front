import { Button, Card, Container, Spinner } from "react-bootstrap";
import Header from "../Components/Header";
import ProteinViewer from "../Components/ProteinViewer";
import { useState } from "react";
import Searcher from "../Components/Searcher";
import img from "../assets/gene.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";
import { useSpinnerContext } from "../context/SpinnerContext";

function ProteinView() {
    const { showToast } = useToastContext();
    const { showSpinner, hideSpinner } = useSpinnerContext();

    const [input, setInput] = useState<string>("");
    const [pressButton, setPressButton] = useState<boolean>(false);
    const [spin, setSpin] = useState<boolean>(false);

    const location = useLocation();
    const namePage: string = location.pathname;

    const navigate = useNavigate();
    if (namePage == "/") {
        navigate("/protein");
    }

    const handleClick = () => {
        showToast("click", "primary");
        setSpin(!spin)
        !spin ? showSpinner() : hideSpinner();
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
                    <Card className="mx-3">
                        <ProteinViewer pdbId={input} />
                    </Card>
                ) : (
                    ""
                )}
                <Button onClick={handleClick} >
                    {spin ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (
                        "TOAST"
                    )}
                </Button>
            </>
        </Container>
    );
}

export default ProteinView;
