import { Button, Form } from "react-bootstrap";
import { Icon } from "./Icon";
import { useState, type ChangeEvent } from "react";

type Props = {
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

function PdbUpload({ setFile }: Props) {
    const [name, setName] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setName(file.name);
            setFile(file);
            //console.log(file);
            //console.log(file.name);

            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                const text = e.target?.result as string;
                console.log(text);
            };
        }
    };

    return (
        <>
            <Form className="d-flex justify-content-center">
                <Button
                    className="align-items-center"
                    size="sm"
                    variant="outline-secondary"
                    as="label"
                    htmlFor="file-upload"
                >
                    <div className="d-flex justify-content-center align-items-center">
                        <Icon type={"upload"} />
                        <p className="m-0 d-flex  justify-content-center font-monospace">
                            {name == null ? "PDB File" : name}
                        </p>
                    </div>
                </Button>
                <Form.Control
                    id="file-upload"
                    type="file"
                    accept=".pdb"
                    onChange={handleFileChange}
                    className="d-none"
                />
            </Form>
        </>
    );
}

export default PdbUpload;
