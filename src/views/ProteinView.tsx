import { Button, Container } from "react-bootstrap";
import Header from "../Components/Header";
import { useState, type SetStateAction } from "react";
import img from "../assets/gene.png";
import { useToastContext } from "../context/ToastContext";
import PdbUpload from "../Components/PdbUpload";
import ModalUniprotDetail from "../Components/ModalUniprotDetail";
import { useSpinnerContext } from "../context/SpinnerContext";
import Searcher from "../Components/Searcher";

function ProteinView() {
    const { showToast } = useToastContext();
    const { showSpinner, hideSpinner } = useSpinnerContext();
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState<string>("");
    const [structure, setStructure] = useState<string>("");
    const [modalShow, setModalShow] = useState<boolean>(false);

    const viewStructure = async () => {
        if (file == null) {
            showToast(
                "Suba un archivo PDB para visualizar",
                "Warning",
                "warning"
            );
            return;
        }
        showSpinner();
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            const text = e.target?.result as string;
            setName(file.name);
            console.log(text);
            setStructure(text);
            setModalShow(true);
        };
        hideSpinner();
    };

    return (
        <Container fluid className="mt-3 pb-5">
            <Header title="Viewer" text="3DMol." imageSrc={img} />
            {/* <Searcher
                    text={"PDB ID"}
                    input={input}
                    setInput={setInput}
                    onSubmit={() => setPressButton(true)}
                    placeholder={"4Q0G"}
                /> */}
            <div className="d-flex justify-content-end gap-3 me-3">
                <PdbUpload setFile={setFile} />
                <Button variant="light" size="sm" onClick={viewStructure}>
                    SHOW
                </Button>
            </div>
            <ModalUniprotDetail
                modalShow={modalShow}
                setModalShow={setModalShow}
                estructure={structure}
                uniprotId={name}
            />
        </Container>
    );
}

export default ProteinView;
