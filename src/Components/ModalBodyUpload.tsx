import { type ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";
import type { FastaDictionary } from "../types/FastaDictionary";
import { Icon } from "./Icon";

type Props = {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDictionary: React.Dispatch<React.SetStateAction<FastaDictionary>>;
    setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalBodyUpload({ setName, setDictionary, setShowTable }: Props) {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setName(file.name);
            //console.log(file);
            console.log(file.name);

            const dictionary: FastaDictionary = {};

            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                const text = e.target?.result as string;
                //console.log(text);

                let header: string = "";
                text.split("\n").map((line) => {
                    line = line.trim();

                    if (line.startsWith(">")) {
                        header = line;
                        dictionary[header] = ""; //inicio el header
                    } else if (line.length < 1) {
                        //nada
                        return;
                    } else {
                        if (!header) {
                            header = "unnamed";
                            dictionary[header] = "";
                        }
                        dictionary[header] += line;
                    }
                });
                console.log(dictionary); ///!!!
                setDictionary(dictionary);
                setShowTable(true);
            };
        }
    };

    return (
        <>
            <p className="d-flex justify-content-center">subir</p>
            <p className="d-flex justify-content-center">o</p>
            <Form className="d-flex justify-content-center">
                <Button
                    className="align-items-center"
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => handleFileChange}
                    as="label"
                    htmlFor="file-upload"
                >
                    <div className="d-flex align-items-start">
                        <Icon type={"upload"} />
                    </div>
                </Button>
                <Form.Control
                    id="file-upload"
                    type="file"
                    accept=".fasta"
                    onChange={handleFileChange}
                    className="d-none"
                />
            </Form>
        </>
    );
}

export default ModalBodyUpload;
