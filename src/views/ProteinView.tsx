import { Button, Card, Container, Spinner } from "react-bootstrap";
import Header from "../Components/Header";
import ProteinViewer from "../Components/ProteinViewer";
import { useState } from "react";
import Searcher from "../Components/Searcher";
import img from "../assets/gene.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";
import PdbUpload from "../Components/PdbUpload";
import { GetCompare } from "../services/PythonServices";

function ProteinView() {
    const { showToast } = useToastContext();

    const [input, setInput] = useState<string>("");
    const [pressButton, setPressButton] = useState<boolean>(false);
    const [spin, setSpin] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const location = useLocation();
    const namePage: string = location.pathname;

    const navigate = useNavigate();
    if (namePage == "/") {
        navigate("/protein");
    }

    const handleToast = () => {
        showToast("click", "Success" , "primary");
    };
    const handleSpinner = () => {
        setSpin(!spin);
        //!spin ? showSpinner() : hideSpinner();
    };

    const getCompare = async () => {
        console.log("-------------------------------------");
        console.log(file);
        console.log(input);
        if (!file) return;
        const align: string | null = await GetCompare(file, input, showToast);
        console.log(align);
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
                <PdbUpload setFile={setFile} />
                <div className="d-flex justify-content-end me-3">
                    <Button onClick={handleToast}>TOAST</Button>
                    <Button className="mx-3" onClick={handleSpinner}>
                        {spin ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            "SPINNER"
                        )}
                    </Button>
                    <Button onClick={getCompare}>COMPARE</Button>
                </div>
                {input && pressButton && (
                    <Card className="mx-3">
                        <ProteinViewer pdbId={input} />
                    </Card>
                )}
            </>
        </Container>
    );
}

export default ProteinView;
